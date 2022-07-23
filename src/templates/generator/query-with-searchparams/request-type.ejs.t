---
to: <%= outputpath %>/index.d.ts
inject: true
append: true
---
export type <%= h.inflection.camelize(name) %>SearchParams = { <%- searchparams %> }
export type <%= h.inflection.camelize(name) %>Output = <%- output %>
export type <%= h.inflection.camelize(name) %> = (searchParams: <%= h.inflection.camelize(name) %>SearchParams) => Promise<AxiosResponse<<%= h.inflection.camelize(name) %>Output>>
export const <%= name %>: <%= h.inflection.camelize(name) %>
