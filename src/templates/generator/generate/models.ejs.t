---
to: <%- outputpath %>/models.d.ts
---
<% JSON.parse(models).forEach(model => { %>
<%- model %><% }) %>
