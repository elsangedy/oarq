---
to: <%= outputpath %>/index.d.ts
inject: true
append: true
---
export type <%= h.inflection.camelize(name) %>PathParams = { <%- pathparams %> }
export type <%= h.inflection.camelize(name) %>SearchParams = { <%- searchparams %> }
export type <%= h.inflection.camelize(name) %>Input = <%- input %>
export type <%= h.inflection.camelize(name) %>Output = <%- output %>
export type <%= h.inflection.camelize(name) %> = (input: <%= h.inflection.camelize(name) %>Input, pathParams: <%= h.inflection.camelize(name) %>PathParams, searchParams?: <%= h.inflection.camelize(name) %>SearchParams) => Promise<AxiosResponse<<%= h.inflection.camelize(name) %>Output>>
export const <%= name %>: <%= h.inflection.camelize(name) %>
