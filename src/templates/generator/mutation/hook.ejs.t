---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export const use<%= h.inflection.camelize(name) %> = (
  options = {}
) => useMutation({
  mutationFn: () => <%= name %>(),
  ...options
})
