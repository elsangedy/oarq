---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export const <%= name %> = (pathParams, searchParams) => instance.get(replacePathParams('<%= url %>', pathParams), { params: searchParams })
