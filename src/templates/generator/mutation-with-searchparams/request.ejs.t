---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export const <%= name %> = (searchParams) => instance.<%= method %>('<%= url %>', undefined, { params: searchParams })
