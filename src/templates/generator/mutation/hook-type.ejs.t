---
to: <%= outputpath %>/index.d.ts
inject: true
append: true
---
export type Use<%= h.inflection.camelize(name) %> = (
  options?: UseMutationOptions<<%= h.inflection.camelize(name) %>Output>
) => UseMutationResult<<%= h.inflection.camelize(name) %>Output>
export const use<%= h.inflection.camelize(name) %>: Use<%= h.inflection.camelize(name) %>
