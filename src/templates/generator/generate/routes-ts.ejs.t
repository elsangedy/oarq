---
to: <%- outputpath %>/routes.d.ts
---
import { Route, RouterMap } from "./runtime";
<% JSON.parse(models).forEach(model => { %>
<%- model %><% }) %>

export type QueriesRoutes = {<% JSON.parse(queries).forEach(query => { %>
  "<%- query.operationName %>": Route<<%- query.pathParamsType %>, <%- query.searchParamsType %>, undefined, <%- query.responseType %>>,<% }) %>
};

export type MutationsRoutes = {<% JSON.parse(mutations).forEach(mutation => { %>
  "<%- mutation.operationName %>": Route<<%- mutation.pathParamsType %>, <%- mutation.searchParamsType %>, <%- mutation.requestBodyType %>, <%- mutation.responseType %>>;<% }) %>
};

export const routerQueriesMap: RouterMap<QueriesRoutes>

export const routerMutationsMap: RouterMap<MutationsRoutes>
