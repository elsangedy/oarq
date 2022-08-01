---
to: <%- outputpath %>/routes.js
---
export const routerQueriesMap = {<% JSON.parse(queries).forEach(query => { %>
  "<%- query.operationName %>": ["get", "<%- query.route %>"],<% }) %>
};

export const routerMutationsMap = {<% JSON.parse(mutations).forEach(mutation => { %>
  "<%- mutation.operationName %>": ["<%- mutation.verb %>", "<%- mutation.route %>"],<% }) %>
};
