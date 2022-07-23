import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { QueryKey, UseQueryOptions, UseQueryResult, UseMutationOptions, UseMutationResult } from 'react-query'

export const instance: AxiosInstance

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

export type UseMutationCriarCobranca = (
  pathParams: MutationCriarCobrancaPathParams,
  options?: UseMutationOptions<MutationCriarCobrancaOutput, unknown, MutationCriarCobrancaInput>
) => UseMutationResult<MutationCriarCobrancaOutput, unknown, MutationCriarCobrancaInput>
export const useMutationCriarCobranca: UseMutationCriarCobranca

export type MutationCriarCobrancaPathParams = { txid: TxId }
export type MutationCriarCobrancaInput = CobBodyRequestBody
export type MutationCriarCobrancaOutput = CobGerada
export type MutationCriarCobranca = (input: MutationCriarCobrancaInput, pathParams: MutationCriarCobrancaPathParams) => Promise<AxiosResponse<MutationCriarCobrancaOutput>>
export const mutationCriarCobranca: MutationCriarCobranca

export type UseMutationRevisarCobranca = (
  pathParams: MutationRevisarCobrancaPathParams,
  options?: UseMutationOptions<MutationRevisarCobrancaOutput, unknown, MutationRevisarCobrancaInput>
) => UseMutationResult<MutationRevisarCobrancaOutput, unknown, MutationRevisarCobrancaInput>
export const useMutationRevisarCobranca: UseMutationRevisarCobranca

export type MutationRevisarCobrancaPathParams = { txid: TxId }
export type MutationRevisarCobrancaInput = CobBodyRevisadaRequestBody
export type MutationRevisarCobrancaOutput = CobGerada
export type MutationRevisarCobranca = (input: MutationRevisarCobrancaInput, pathParams: MutationRevisarCobrancaPathParams) => Promise<AxiosResponse<MutationRevisarCobrancaOutput>>
export const mutationRevisarCobranca: MutationRevisarCobranca

export type UseQueryConsultarCobranca = (
  pathParams: QueryConsultarCobrancaPathParams,
  searchParams?: QueryConsultarCobrancaSearchParams,
  options?: UseQueryOptions<QueryConsultarCobrancaOutput>
) => UseQueryResult<QueryConsultarCobrancaOutput>
export type UseQueryConsultarCobrancaWithQueryKey = UseQueryConsultarCobranca & {
  queryKey: (
    pathParams?: QueryConsultarCobrancaPathParams,
    searchParams?: QueryConsultarCobrancaSearchParams
  ) => QueryKey
}
export const useQueryConsultarCobranca: UseQueryConsultarCobrancaWithQueryKey

export type QueryConsultarCobrancaPathParams = { txid: TxId }
export type QueryConsultarCobrancaSearchParams = { revisao?: Revisao }
export type QueryConsultarCobrancaOutput = CobCompleta
export type QueryConsultarCobranca = (pathParams: QueryConsultarCobrancaPathParams, searchParams: QueryConsultarCobrancaSearchParams) => Promise<AxiosResponse<QueryConsultarCobrancaOutput>>
export const queryConsultarCobranca: QueryConsultarCobranca

export type UseQueryConsultarListaDeCobrancas = (
  searchParams?: QueryConsultarListaDeCobrancasSearchParams,
  options?: UseQueryOptions<QueryConsultarListaDeCobrancasOutput>
) => UseQueryResult<QueryConsultarListaDeCobrancasOutput>
export type UseQueryConsultarListaDeCobrancasWithQueryKey = UseQueryConsultarListaDeCobrancas & {
  queryKey: (
    searchParams?: QueryConsultarListaDeCobrancasSearchParams
  ) => QueryKey
}
export const useQueryConsultarListaDeCobrancas: UseQueryConsultarListaDeCobrancasWithQueryKey

export type QueryConsultarListaDeCobrancasSearchParams = { cpf?: Cpf & any; cnpj?: Cnpj & any; status?: CobStatus & any }
export type QueryConsultarListaDeCobrancasOutput = CobsConsultadas
export type QueryConsultarListaDeCobrancas = (searchParams: QueryConsultarListaDeCobrancasSearchParams) => Promise<AxiosResponse<QueryConsultarListaDeCobrancasOutput>>
export const queryConsultarListaDeCobrancas: QueryConsultarListaDeCobrancas

export type UseMutationSolicitarDevolucao = (
  pathParams: MutationSolicitarDevolucaoPathParams,
  options?: UseMutationOptions<MutationSolicitarDevolucaoOutput, unknown, MutationSolicitarDevolucaoInput>
) => UseMutationResult<MutationSolicitarDevolucaoOutput, unknown, MutationSolicitarDevolucaoInput>
export const useMutationSolicitarDevolucao: UseMutationSolicitarDevolucao

export type MutationSolicitarDevolucaoPathParams = { e2eid: EndToEndId; id: DevolucaoId }
export type MutationSolicitarDevolucaoInput = { valor?: Valor & any }
export type MutationSolicitarDevolucaoOutput = Devolucao
export type MutationSolicitarDevolucao = (input: MutationSolicitarDevolucaoInput, pathParams: MutationSolicitarDevolucaoPathParams) => Promise<AxiosResponse<MutationSolicitarDevolucaoOutput>>
export const mutationSolicitarDevolucao: MutationSolicitarDevolucao

export type UseQueryConsultarDevolucao = (
  pathParams: QueryConsultarDevolucaoPathParams,
  options?: UseQueryOptions<QueryConsultarDevolucaoOutput>
) => UseQueryResult<QueryConsultarDevolucaoOutput>
export type UseQueryConsultarDevolucaoWithQueryKey = UseQueryConsultarDevolucao & {
  queryKey: (
    pathParams?: QueryConsultarDevolucaoPathParams
  ) => QueryKey
}
export const useQueryConsultarDevolucao: UseQueryConsultarDevolucaoWithQueryKey

export type QueryConsultarDevolucaoPathParams = { e2eid: EndToEndId; id: DevolucaoId }
export type QueryConsultarDevolucaoOutput = Devolucao
export type QueryConsultarDevolucao = (pathParams: QueryConsultarDevolucaoPathParams) => Promise<AxiosResponse<QueryConsultarDevolucaoOutput>>
export const queryConsultarDevolucao: QueryConsultarDevolucao

export type UseQueryConsultarPix = (
  pathParams: QueryConsultarPixPathParams,
  options?: UseQueryOptions<QueryConsultarPixOutput>
) => UseQueryResult<QueryConsultarPixOutput>
export type UseQueryConsultarPixWithQueryKey = UseQueryConsultarPix & {
  queryKey: (
    pathParams?: QueryConsultarPixPathParams
  ) => QueryKey
}
export const useQueryConsultarPix: UseQueryConsultarPixWithQueryKey

export type QueryConsultarPixPathParams = { e2eid: EndToEndId }
export type QueryConsultarPixOutput = Pix
export type QueryConsultarPix = (pathParams: QueryConsultarPixPathParams) => Promise<AxiosResponse<QueryConsultarPixOutput>>
export const queryConsultarPix: QueryConsultarPix

export type UseQueryConsultarPixRecebidos = (
  searchParams?: QueryConsultarPixRecebidosSearchParams,
  options?: UseQueryOptions<QueryConsultarPixRecebidosOutput>
) => UseQueryResult<QueryConsultarPixRecebidosOutput>
export type UseQueryConsultarPixRecebidosWithQueryKey = UseQueryConsultarPixRecebidos & {
  queryKey: (
    searchParams?: QueryConsultarPixRecebidosSearchParams
  ) => QueryKey
}
export const useQueryConsultarPixRecebidos: UseQueryConsultarPixRecebidosWithQueryKey

export type QueryConsultarPixRecebidosSearchParams = { txId?: TxId; cpf?: Cpf & any; cnpj?: Cnpj & any }
export type QueryConsultarPixRecebidosOutput = PixConsultados
export type QueryConsultarPixRecebidos = (searchParams: QueryConsultarPixRecebidosSearchParams) => Promise<AxiosResponse<QueryConsultarPixRecebidosOutput>>
export const queryConsultarPixRecebidos: QueryConsultarPixRecebidos

export type UseQueryRecuperarOPayloadJsonQueRepresentaACobranca = (
  pathParams: QueryRecuperarOPayloadJsonQueRepresentaACobrancaPathParams,
  options?: UseQueryOptions<QueryRecuperarOPayloadJsonQueRepresentaACobrancaOutput>
) => UseQueryResult<QueryRecuperarOPayloadJsonQueRepresentaACobrancaOutput>
export type UseQueryRecuperarOPayloadJsonQueRepresentaACobrancaWithQueryKey = UseQueryRecuperarOPayloadJsonQueRepresentaACobranca & {
  queryKey: (
    pathParams?: QueryRecuperarOPayloadJsonQueRepresentaACobrancaPathParams
  ) => QueryKey
}
export const useQueryRecuperarOPayloadJsonQueRepresentaACobranca: UseQueryRecuperarOPayloadJsonQueRepresentaACobrancaWithQueryKey

export type QueryRecuperarOPayloadJsonQueRepresentaACobrancaPathParams = { pixUrlAcessToken: string }
export type QueryRecuperarOPayloadJsonQueRepresentaACobrancaOutput = void
export type QueryRecuperarOPayloadJsonQueRepresentaACobranca = (pathParams: QueryRecuperarOPayloadJsonQueRepresentaACobrancaPathParams) => Promise<AxiosResponse<QueryRecuperarOPayloadJsonQueRepresentaACobrancaOutput>>
export const queryRecuperarOPayloadJsonQueRepresentaACobranca: QueryRecuperarOPayloadJsonQueRepresentaACobranca

export type UseMutationConfigurarOWebhookPix = (
  options?: UseMutationOptions<MutationConfigurarOWebhookPixOutput, unknown, MutationConfigurarOWebhookPixInput>
) => UseMutationResult<MutationConfigurarOWebhookPixOutput, unknown, MutationConfigurarOWebhookPixInput>
export const useMutationConfigurarOWebhookPix: UseMutationConfigurarOWebhookPix

export type MutationConfigurarOWebhookPixInput = Webhook
export type MutationConfigurarOWebhookPixOutput = void
export type MutationConfigurarOWebhookPix = (input: MutationConfigurarOWebhookPixInput) => Promise<AxiosResponse<MutationConfigurarOWebhookPixOutput>>
export const mutationConfigurarOWebhookPix: MutationConfigurarOWebhookPix

export type UseQueryExibirInformacoesAcercaDoWebookPix = (
  options?: UseQueryOptions<QueryExibirInformacoesAcercaDoWebookPixOutput>,
  config?: AxiosRequestConfig<void>
) => UseQueryResult<QueryExibirInformacoesAcercaDoWebookPixOutput>
export type UseQueryExibirInformacoesAcercaDoWebookPixWithQueryKey = UseQueryExibirInformacoesAcercaDoWebookPix & {
  queryKey: () => QueryKey
}
export const useQueryExibirInformacoesAcercaDoWebookPix: UseQueryExibirInformacoesAcercaDoWebookPixWithQueryKey

export type QueryExibirInformacoesAcercaDoWebookPixOutput = Webhook
export type QueryExibirInformacoesAcercaDoWebookPix = (config?: AxiosRequestConfig<void>) => Promise<AxiosResponse<QueryExibirInformacoesAcercaDoWebookPixOutput>>
export const queryExibirInformacoesAcercaDoWebookPix: QueryExibirInformacoesAcercaDoWebookPix

export type UseMutationCancelarOWebhookPix = (
  options?: UseMutationOptions<MutationCancelarOWebhookPixOutput>
) => UseMutationResult<MutationCancelarOWebhookPixOutput>
export const useMutationCancelarOWebhookPix: UseMutationCancelarOWebhookPix

export type MutationCancelarOWebhookPixOutput = void
export type MutationCancelarOWebhookPix = () => Promise<AxiosResponse<MutationCancelarOWebhookPixOutput>>
export const mutationCancelarOWebhookPix: MutationCancelarOWebhookPix

