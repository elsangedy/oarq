---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export const use<%= h.inflection.camelize(name) %> = (
  pathParams,
  searchParams,
  options = {}
) => useMutation({
  mutationFn: () => <%= name %>(pathParams, searchParams),
  ...options
})
