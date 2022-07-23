---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export const <%= name %> = (searchParams) => instance.get('<%= url %>', { params: searchParams })
