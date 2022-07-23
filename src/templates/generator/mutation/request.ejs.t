---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export const <%= name %> = () => instance.<%= method %>('<%= url %>')
