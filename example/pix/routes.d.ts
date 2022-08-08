import { Route, RouterMap } from "./runtime";

export type TxId = string
export type EndToEndId = string
export type DevolucaoId = string
export type CobStatus = "ATIVA" | "CONCLUIDA" | "REMOVIDA_PELO_USUARIO_RECEBEDOR" | "REMOVIDA_PELO_PSP"
export type Cpf = string
export type Cnpj = string
export type Revisao = number
export type Location = string
export type PessoaFisica = { cpf: Cpf & any; nome: string }
export type PessoaJuridica = { cnpj: Cnpj & any; nome: string }
export type Webhook = { webhookUrl: string }
export type CobExpiracao = { expiracao?: number }
export type CobApresentacao = { apresentacao: string }
export type CobCriacao = { criacao: string }
export type Valor = string
export type CobBase = { devedor?: PessoaFisica | PessoaJuridica; valor?: { original: Valor & any }; chave?: string; solicitacaoPagador?: string; infoAdicionais?: { nome: string; valor: string }[] }
export type CobSolicitada = { calendario?: CobExpiracao } & CobBase
export type CobRevisada = { calendario?: CobExpiracao; status?: CobStatus } & CobBase
export type CobGerada = { calendario?: CobCriacao & CobExpiracao; status?: CobStatus; txid?: TxId; revisao?: Revisao; location?: Location } & CobBase
export type CobCompleta = CobGerada & CobSolicitada & { pix?: Pix[] }
export type CobPayload = { txid?: TxId; revisao?: Revisao; calendario?: CobCriacao & CobApresentacao & CobExpiracao; status?: CobStatus } & CobBase
export type ParametrosConsultaCob = { inicio: string; fim: string; cpf?: Cpf & any; cnpj?: Cnpj & any; status?: CobStatus & any; paginacao: Paginacao }
export type CobsConsultadas = { parametros: ParametrosConsultaCob; cobs: (CobCompleta & any)[] }
export type Pix = { endToEndId: EndToEndId; txid?: TxId; valor: Valor & any; horario: string; pagador?: PessoaFisica | PessoaJuridica; infoPagador?: string; devolucoes?: Devolucao[] }
export type Devolucao = { id: DevolucaoId; rtrId: string; valor: Valor & any; horario: { solicitacao: string; liquidacao?: string }; status: "EM_PROCESSAMENTO" | "DEVOLVIDO" | "NAO_REALIZADO" }
export type ParametrosConsultaPix = { inicio: string; fim: string; cpf?: Cpf & any; cnpj?: Cnpj & any; txId?: TxId; paginacao: Paginacao }
export type PixConsultados = { parametros: ParametrosConsultaPix; pix?: (Pix)[] }
export type Paginacao = { paginaAtual: number; itensPorPagina: number; quantidadeDePaginas: number; quantidadeTotalDeItens: number }
export type CobBodyRequestBody = CobSolicitada;
export type CobBodyRevisadaRequestBody = CobRevisada;
export type WebhookPixBodyRequestBody = { pix?: Pix[] };

export type QueriesRoutes = {
  "consultarCobranca": Route<{ txid: TxId }, { revisao?: Revisao } | undefined, undefined, CobCompleta>,
  "consultarListaDeCobrancas": Route<undefined, { inicio: string; fim: string; cpf?: Cpf & any; cnpj?: Cnpj & any; status?: CobStatus & any; "paginacao.paginaAtual"?: number; "paginacao.itensPorPagina"?: number }, undefined, CobsConsultadas>,
  "consultarDevolucao": Route<{ e2eid: EndToEndId; id: DevolucaoId }, undefined, undefined, Devolucao>,
  "consultarPix": Route<{ e2eid: EndToEndId }, undefined, undefined, Pix>,
  "consultarPixRecebidos": Route<undefined, { inicio: string; fim: string; txId?: TxId; cpf?: Cpf & any; cnpj?: Cnpj & any; "paginacao.paginaAtual"?: number; "paginacao.itensPorPagina"?: number }, undefined, PixConsultados>,
  "recuperarOPayloadJsonQueRepresentaACobranca": Route<{ pixUrlAcessToken: string }, undefined, undefined, void>,
  "exibirInformacoesAcercaDoWebookPix": Route<undefined, undefined, undefined, Webhook>,
};

export type MutationsRoutes = {
  "criarCobranca": Route<{ txid: TxId }, undefined, CobBodyRequestBody, CobGerada>;
  "revisarCobranca": Route<{ txid: TxId }, undefined, CobBodyRevisadaRequestBody, CobGerada>;
  "solicitarDevolucao": Route<{ e2eid: EndToEndId; id: DevolucaoId }, undefined, { valor?: Valor & any }, Devolucao>;
  "configurarOWebhookPix": Route<undefined, undefined, Webhook, void>;
  "cancelarOWebhookPix": Route<undefined, undefined, void, void>;
};

export const routerQueriesMap: RouterMap<QueriesRoutes>

export const routerMutationsMap: RouterMap<MutationsRoutes>
