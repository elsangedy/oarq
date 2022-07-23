---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export const <%= name %> = (input) => instance.<%= method %>('<%= url %>', input)
