import {
  useQuery as useQueryBase,
  useMutation as useMutationBase,
  UseQueryOptions,
  UseMutationOptions,
} from "react-query";

export type Method = "get" | "post" | "put" | "patch" | "delete";

export type Route<TPathParams, TSearchParams, TBody, TOutput> = {
  pathParams: TPathParams;
  searchParams: TSearchParams;
  body: TBody;
  output: TOutput;
};
export type AnyRoute = Route<any, any, any, any>;

export type Router<TPathParams, TSearchParams, TBody, TOutput> = Record<
  string,
  Route<TPathParams, TSearchParams, TBody, TOutput>
>;
export type AnyRouter = Router<any, any, any, any>;

export type RouterMap<TRouter extends AnyRouter> = {
  [TPath in keyof TRouter]: [Method, string];
};

type inferSearchParams<TRoute extends AnyRoute> = TRoute extends Route<
  any,
  infer TSearchParams,
  any,
  any
>
  ? undefined extends TSearchParams
    ? unknown extends TSearchParams
      ? [(null | undefined)?]
      : [(TSearchParams | null | undefined)?]
    : [TSearchParams]
  : [(null | undefined)?];

export type Adapter<TAdapterConfig> = (
  request: {
    url: string;
    method: Method;
    params?: object;
    body?: object;
  },
  config?: TAdapterConfig
) => Promise<any>;

export const createAdapter = <T>(adapter: Adapter<T>) => adapter;

export const create =
  <TRouterQueries extends AnyRouter, TRouterMutations extends AnyRouter>(
    routerQueries: RouterMap<TRouterQueries>,
    routerMutations: RouterMap<TRouterMutations>
  ) =>
  <TAdapterConfig>(adapter: Adapter<TAdapterConfig>) => {
    const query = async <
      TPath extends keyof TRouterQueries,
      TInput extends undefined extends TRouterQueries[TPath]["pathParams"]
        ? inferSearchParams<TRouterQueries[TPath]>
        : [
            TRouterQueries[TPath]["pathParams"],
            ...inferSearchParams<TRouterQueries[TPath]>
          ],
      TOutput extends TRouterQueries[TPath]["output"]
    >(
      pathAndParams: [path: TPath, ...args: TInput],
      config?: TAdapterConfig
    ) => {
      const [path, maybePathParams, maybeSearchParams] = pathAndParams;
      const route = routerQueries[path];
      if (!route) throw new Error("path router not found");
      const [method, pathname] = route;
      const urlPathParams = pathname.match(/{([^}]+)}/g);
      const url = urlPathParams
        ? urlPathParams.reduce(
            (acc, param) =>
              acc.replace(param, maybePathParams[param.replace(/{|}/g, "")]),
            pathname
          )
        : pathname;
      const params = urlPathParams ? maybeSearchParams : maybePathParams;
      return adapter({ url, method, params: params as any }, config) as TOutput;
    };

    const mutation = async <
      TPath extends keyof TRouterMutations,
      TInput extends undefined extends TRouterMutations[TPath]["pathParams"]
        ? inferSearchParams<TRouterMutations[TPath]>
        : [
            TRouterMutations[TPath]["pathParams"],
            ...inferSearchParams<TRouterMutations[TPath]>
          ],
      TBody extends TRouterMutations[TPath]["body"],
      TOutput extends TRouterMutations[TPath]["output"]
    >(
      pathAndParams: [path: TPath, ...args: TInput],
      body: TBody,
      config?: TAdapterConfig
    ) => {
      const [path, maybePathParams, maybeSearchParams] = pathAndParams;
      const route = routerMutations[path];
      if (!route) throw new Error("path router not found");
      const [method, pathname] = route;
      const urlPathParams = pathname.match(/{([^}]+)}/g);
      const url = urlPathParams
        ? urlPathParams.reduce(
            (acc, param) =>
              acc.replace(param, maybePathParams[param.replace(/{|}/g, "")]),
            pathname
          )
        : pathname;
      const params = urlPathParams ? maybeSearchParams : maybePathParams;
      return adapter(
        { url, method, params: params as any, body },
        config
      ) as TOutput;
    };

    const useQuery = <
      TPath extends keyof TRouterQueries,
      TInput extends undefined extends TRouterQueries[TPath]["pathParams"]
        ? inferSearchParams<TRouterQueries[TPath]>
        : [
            TRouterQueries[TPath]["pathParams"],
            ...inferSearchParams<TRouterQueries[TPath]>
          ],
      TOutput extends TRouterQueries[TPath]["output"]
    >(
      pathAndParams: [path: TPath, ...args: TInput],
      options?: UseQueryOptions<TOutput, unknown, TOutput, [TPath, ...TInput]>,
      config?: TAdapterConfig
    ) =>
      useQueryBase<TOutput, unknown, TOutput, [TPath, ...TInput]>(
        pathAndParams,
        () => query(pathAndParams, config),
        options
      );

    const useMutation = <
      TPath extends keyof TRouterMutations,
      TInput extends undefined extends TRouterMutations[TPath]["pathParams"]
        ? inferSearchParams<TRouterMutations[TPath]>
        : [
            TRouterMutations[TPath]["pathParams"],
            ...inferSearchParams<TRouterMutations[TPath]>
          ],
      TBody extends TRouterMutations[TPath]["body"],
      TOutput extends TRouterMutations[TPath]["output"]
    >(
      pathAndParams: [path: TPath, ...args: TInput],
      options?: UseMutationOptions<TOutput, unknown, TBody>,
      config?: TAdapterConfig
    ) =>
      useMutationBase<TOutput, unknown, TBody>(
        (body: TBody) => mutation(pathAndParams, body, config),
        options
      );

    return {
      query,
      mutation,
      useQuery,
      useMutation,
    };
  };
