import { Route, RouterMap } from "./runtime";

export type ToDo = { id: number; description: string };

export type QueriesRoutes = {
  "to-dos-list": Route<
    undefined,
    { page?: number } | undefined,
    undefined,
    ToDo[]
  >;
  "to-dos-read": Route<{ id: number }, undefined, undefined, ToDo>;
  "patient-to-dos-list": Route<
    { id: number },
    { page?: number } | undefined,
    undefined,
    ToDo[]
  >;
};

export type MutationsRoutes = {
  "to-dos-create": Route<undefined, undefined, { description: string }, ToDo>;
  "patient-to-dos-create": Route<
    { id: number },
    undefined,
    { description: string },
    ToDo
  >;
};

export const routerQueriesMap: RouterMap<QueriesRoutes> = {
  "to-dos-list": ["get", "/v1/to-dos"],
  "to-dos-read": ["get", "/v1/to-dos/{id}"],
  "patient-to-dos-list": ["get", "/v1/patients/{id}/to-dos"],
};
export const routerMutationsMap: RouterMap<MutationsRoutes> = {
  "to-dos-create": ["post", "/v1/to-dos"],
  "patient-to-dos-create": ["post", "/v1/patients/{id}/to-dos"],
};
