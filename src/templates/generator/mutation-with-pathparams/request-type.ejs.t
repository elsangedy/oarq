---
to: <%= outputpath %>/index.d.ts
inject: true
append: true
---
export type <%= h.inflection.camelize(name) %>PathParams = { <%- pathparams %> }
export type <%= h.inflection.camelize(name) %>Output = <%- output %>
export type <%= h.inflection.camelize(name) %> = (pathParms: <%= h.inflection.camelize(name) %>PathParams) => Promise<AxiosResponse<<%= h.inflection.camelize(name) %>Output>>
export const <%= name %>: <%= h.inflection.camelize(name) %>
