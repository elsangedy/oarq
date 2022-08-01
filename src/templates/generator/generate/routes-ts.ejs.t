---
to: <%- outputpath %>/routes.d.ts
---
import { Route, RouterMap } from "./runtime";
<% JSON.parse(models).forEach(model => { %>
<%- model %><% }) %>

export type QueriesRoutes = {<% JSON.parse(queries).forEach(query => { %>
  "<%- query.operationName %>": Route<<% if (query.pathParamsType) { %>{ <%- query.pathParamsType %> }<% } else { %>undefined<% } %>, <% if (query.searchParamsType) { %>{ <%- query.searchParamsType %> } | undefined<% } else { %>undefined<% } %>, undefined, <%- query.responseType %>>,<% }) %>
};

export type MutationsRoutes = {<% JSON.parse(mutations).forEach(mutation => { %>
  "<%- mutation.operationName %>": Route<<% if (mutation.pathParamsType) { %>{ <%- mutation.pathParamsType %> }<% } else { %>undefined<% } %>, <% if (mutation.searchParamsType) { %>{ <%- mutation.searchParamsType %> } | undefined<% } else { %>undefined<% } %>, <%- mutation.requestBodyType %>, <%- mutation.responseType %>>;<% }) %>
};

export const routerQueriesMap: RouterMap<QueriesRoutes>

export const routerMutationsMap: RouterMap<MutationsRoutes>
