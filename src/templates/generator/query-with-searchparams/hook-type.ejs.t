---
to: <%= outputpath %>/index.d.ts
inject: true
append: true
---
export type Use<%= h.inflection.camelize(name) %> = (
  searchParams?: <%= h.inflection.camelize(name) %>SearchParams,
  options?: UseQueryOptions<<%= h.inflection.camelize(name) %>Output>
) => UseQueryResult<<%= h.inflection.camelize(name) %>Output>
export type Use<%= h.inflection.camelize(name) %>WithQueryKey = Use<%= h.inflection.camelize(name) %> & {
  queryKey: (
    searchParams?: <%= h.inflection.camelize(name) %>SearchParams
  ) => QueryKey
}
export const use<%= h.inflection.camelize(name) %>: Use<%= h.inflection.camelize(name) %>WithQueryKey
