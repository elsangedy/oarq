---
to: <%= outputpath %>/index.d.ts
inject: true
append: true
---
export type Use<%= h.inflection.camelize(name) %> = (
  pathParams: <%= h.inflection.camelize(name) %>PathParams,
  searchParams?: <%= h.inflection.camelize(name) %>SearchParams,
  options?: UseMutationOptions<<%= h.inflection.camelize(name) %>Output, unknown, <%= h.inflection.camelize(name) %>Input>
) => UseMutationResult<<%= h.inflection.camelize(name) %>Output, unknown, <%= h.inflection.camelize(name) %>Input>
export const use<%= h.inflection.camelize(name) %>: Use<%= h.inflection.camelize(name) %>
