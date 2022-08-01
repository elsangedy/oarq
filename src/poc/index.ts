import {
  routerQueriesMap,
  routerMutationsMap,
  QueriesRoutes,
  MutationsRoutes,
} from "./generated";
import { create } from "./runtime";
const createClient = create<QueriesRoutes, MutationsRoutes>(
  routerQueriesMap,
  routerMutationsMap
);
const client = createClient(async ({ url, method, params }) => {
  console.log(`[${method}] ${url}`, params);
});
client.query(["to-dos-list"]);
client.query(["to-dos-list", { page: 1 }]);
client.query(["to-dos-read", { id: 1 }]);
client.query(["patient-to-dos-list", { id: 1 }]);
client.query(["patient-to-dos-list", { id: 1 }, { page: 1 }]);
client.mutation(["to-dos-create"], { description: "" });
client.mutation(["patient-to-dos-create", { id: 1 }], { description: "" });
