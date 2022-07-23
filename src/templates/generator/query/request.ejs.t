---
to: <%= outputpath %>/index.js
inject: true
append: true
---
export const <%= name %> = (config) => instance.get('<%= url %>', config)
