---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export const <%= name %> = (input, pathParams, searchParams) => instance.<%= method %>(replacePathParams('<%= url %>', pathParams), input, { params: searchParams })
