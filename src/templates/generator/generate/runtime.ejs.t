---
to: <%- outputpath %>/runtime.js
---
import {
  useQuery as useQueryBase,
  useMutation as useMutationBase,
} from "react-query";

export const createAdapter = (adapter) => adapter;

export const create = (routerQueries, routerMutations) => (adapter) => {
  const query = async (pathAndParams, config) => {
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
    return adapter({ url, method, params }, config);
  };

  const mutation = async (pathAndParams, body, config) => {
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
    return adapter({ url, method, params, body }, config);
  };

  const useQuery = (pathAndParams, options, config) =>
    useQueryBase(pathAndParams, () => query(pathAndParams, config), options);

  const useMutation = (pathAndParams, options, config) =>
    useMutationBase((body) => mutation(pathAndParams, body, config), options);

  return {
    query,
    mutation,
    useQuery,
    useMutation,
  };
};
