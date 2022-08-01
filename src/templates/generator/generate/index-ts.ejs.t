---
to: <%- outputpath %>/index.d.ts
---
import { create } from "./runtime";
import { QueriesRoutes, MutationsRoutes } from "./routes";
export { createAdapter } from "./runtime";
export * from "./models";

export const createClient = create<QueriesRoutes, MutationsRoutes>();
