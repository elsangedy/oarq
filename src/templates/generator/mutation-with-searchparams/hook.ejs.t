---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export const use<%= h.inflection.camelize(name) %> = (
  searchParams,
  options = {}
) => useMutation({
  mutationFn: () => <%= name %>(searchParams),
  ...options
})
