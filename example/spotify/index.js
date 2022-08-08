import { create } from "./runtime";
import { routerQueriesMap, routerMutationsMap } from "./routes";
export { createAdapter } from "./runtime";

export const createClient = create(routerQueriesMap, routerMutationsMap);
