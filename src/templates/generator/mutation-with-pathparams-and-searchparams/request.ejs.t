---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export const <%= name %> = (pathParams, searchParams) => instance.<%= method %>(replacePathParams('<%= url %>', pathParams), undefined, { params: searchParams })
