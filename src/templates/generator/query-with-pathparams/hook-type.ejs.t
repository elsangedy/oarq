---
to: <%= outputpath %>/index.d.ts
inject: true
append: true
---
export type Use<%= h.inflection.camelize(name) %> = (
  pathParams: <%= h.inflection.camelize(name) %>PathParams,
  options?: UseQueryOptions<<%= h.inflection.camelize(name) %>Output>
) => UseQueryResult<<%= h.inflection.camelize(name) %>Output>
export type Use<%= h.inflection.camelize(name) %>WithQueryKey = Use<%= h.inflection.camelize(name) %> & {
  queryKey: (
    pathParams?: <%= h.inflection.camelize(name) %>PathParams
  ) => QueryKey
}
export const use<%= h.inflection.camelize(name) %>: Use<%= h.inflection.camelize(name) %>WithQueryKey
