---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export const <%= name %> = (searchParams, input) => instance.<%= method %>('<%= url %>', input, { params: searchParams })
