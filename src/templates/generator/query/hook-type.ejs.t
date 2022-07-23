---
to: <%= outputpath %>/index.d.ts
inject: true
append: true
---
export type Use<%= h.inflection.camelize(name) %> = (
  options?: UseQueryOptions<<%= h.inflection.camelize(name) %>Output>,
  config?: AxiosRequestConfig<void>
) => UseQueryResult<<%= h.inflection.camelize(name) %>Output>
export type Use<%= h.inflection.camelize(name) %>WithQueryKey = Use<%= h.inflection.camelize(name) %> & {
  queryKey: () => QueryKey
}
export const use<%= h.inflection.camelize(name) %>: Use<%= h.inflection.camelize(name) %>WithQueryKey
