---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export const <%= name %> = (pathParams) => instance.<%= method %>(replacePathParams('<%= url %>', pathParams))
