---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export function use<%= h.inflection.camelize(name) %>(
  pathParams,
  options = {}
) {
  return useQuery({
    queryKey: use<%= h.inflection.camelize(name) %>.queryKey(pathParams),
    queryFn: () => <%= name %>(pathParams),
    ...options
  })
}
use<%= h.inflection.camelize(name) %>.queryKey = (pathParams) =>
  ['<%= url %>', pathParams].filter(Boolean)
