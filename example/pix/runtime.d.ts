import {
  UseQueryOptions,
  UseQueryResult,
  UseMutationOptions,
  UseMutationResult,
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

export const createAdapter: <T>(adapter: Adapter<T>) => Adapter<T>;

export const create: <
  TRouterQueries extends AnyRouter,
  TRouterMutations extends AnyRouter
>(
  routerQueries: RouterMap<TRouterQueries>,
  routerMutations: RouterMap<TRouterMutations>
) => <TAdapterConfig>(adapter: Adapter<TAdapterConfig>) => {
  query: <
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
  ) => Promise<TOutput>;

  mutation: <
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
  ) => Promise<TOutput>;

  useQuery: <
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
  ) => UseQueryResult<TOutput, unknown>;

  useMutation: <
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
  ) => UseMutationResult<TOutput, unknown, TBody>;
};
