---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export const <%= name %> = (pathParams) => instance.get(replacePathParams('<%= url %>', pathParams))
