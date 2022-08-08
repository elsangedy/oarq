import { createClient, createAdapter } from "./pix/index";

const logAdapter = createAdapter(async (req) => {
  console.log(req);
});

const client = createClient(logAdapter);

client
  .query(["consultarCobranca", { txid: "1" }, { revisao: 1 }])
  .then((res) => res.valor);

client.query(["consultarPix", { e2eid: "1" }]).then((res) => res.valor);
client.mutation(["criarCobranca", { txid: "1" }], {
  valor: { original: 1 },
  chave: "1",
});
client.useQuery(["consultarPix", { e2eid: "1" }]).data?.valor;
client.useMutation(["criarCobranca", { txid: "1" }]).mutate({
  valor: { original: 1 },
  chave: "1",
});
