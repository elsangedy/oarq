---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export function use<%= h.inflection.camelize(name) %>(
  searchParams,
  options = {}
) {
  return useQuery({
    queryKey: use<%= h.inflection.camelize(name) %>.queryKey(searchParams),
    queryFn: () => <%= name %>(searchParams),
    ...options
  })
}
use<%= h.inflection.camelize(name) %>.queryKey = (searchParams) =>
  ['<%= url %>', searchParams].filter(Boolean)
