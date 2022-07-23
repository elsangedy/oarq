---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export const <%= name %> = (input, pathParams) => instance.<%= method %>(replacePathParams('<%= url %>', pathParams), input)
