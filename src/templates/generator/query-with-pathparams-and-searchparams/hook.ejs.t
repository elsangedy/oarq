---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export function use<%= h.inflection.camelize(name) %>(
  pathParams,
  searchParams,
  options = {}
) {
  return useQuery({
    queryKey: use<%= h.inflection.camelize(name) %>.queryKey(pathParams, searchParams),
    queryFn: () => <%= name %>(pathParams, searchParams),
    ...options
  })
}
use<%= h.inflection.camelize(name) %>.queryKey = (pathParams, searchParams) =>
  ['<%= url %>', pathParams, searchParams].filter(Boolean)
