---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export const use<%= h.inflection.camelize(name) %> = (
  options = {},
  config
) => useQuery({
  queryKey: use<%= h.inflection.camelize(name) %>.queryKey(),
  queryFn: () => <%= name %>(config),
  ...options
})
use<%= h.inflection.camelize(name) %>.queryKey = () => '<%= url %>'
