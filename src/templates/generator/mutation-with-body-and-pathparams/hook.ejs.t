---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export const use<%= h.inflection.camelize(name) %> = (
  pathParams,
  options = {}
) => useMutation({
  mutationFn: (input) => <%= name %>(input, pathParams),
  ...options
})
