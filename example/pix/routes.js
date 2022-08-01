export const routerQueriesMap = {
  "consultarCobranca": ["get", "/cob/{txid}"],
  "consultarListaDeCobrancas": ["get", "/cob/"],
  "consultarDevolucao": ["get", "/pix/{e2eid}/devolucao/{id}"],
  "consultarPix": ["get", "/pix/{e2eid}"],
  "consultarPixRecebidos": ["get", "/pix"],
  "recuperarOPayloadJsonQueRepresentaACobranca": ["get", "/{pixUrlAcessToken}"],
  "exibirInformacoesAcercaDoWebookPix": ["get", "/webhook"],
};

export const routerMutationsMap = {
  "criarCobranca": ["put", "/cob/{txid}"],
  "revisarCobranca": ["patch", "/cob/{txid}"],
  "solicitarDevolucao": ["put", "/pix/{e2eid}/devolucao/{id}"],
  "configurarOWebhookPix": ["put", "/webhook"],
  "cancelarOWebhookPix": ["delete", "/webhook"],
};
