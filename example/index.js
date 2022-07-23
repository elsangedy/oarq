import axios from 'axios'
import { useMutation, useQuery } from 'react-query'

export const instance = axios.create({
  timeout: 1000
})

export const replacePathParams = (url, pathParams) =>
  Object.entries(pathParams).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, value),
    url
  )

export const useMutationCriarCobranca = (
  pathParams,
  options = {}
) => useMutation({
  mutationFn: (input) => mutationCriarCobranca(input, pathParams),
  ...options
})

export const mutationCriarCobranca = (input, pathParams) => instance.put(replacePathParams('/cob/{txid}', pathParams), input)

export const useMutationRevisarCobranca = (
  pathParams,
  options = {}
) => useMutation({
  mutationFn: (input) => mutationRevisarCobranca(input, pathParams),
  ...options
})

export const mutationRevisarCobranca = (input, pathParams) => instance.patch(replacePathParams('/cob/{txid}', pathParams), input)

export function useQueryConsultarCobranca(
  pathParams,
  searchParams,
  options = {}
) {
  return useQuery({
    queryKey: useQueryConsultarCobranca.queryKey(pathParams, searchParams),
    queryFn: () => queryConsultarCobranca(pathParams, searchParams),
    ...options
  })
}
useQueryConsultarCobranca.queryKey = (pathParams, searchParams) =>
  ['/cob/{txid}', pathParams, searchParams].filter(Boolean)

export const queryConsultarCobranca = (pathParams, searchParams) => instance.get(replacePathParams('/cob/{txid}', pathParams), { params: searchParams })

export function useQueryConsultarListaDeCobrancas(
  searchParams,
  options = {}
) {
  return useQuery({
    queryKey: useQueryConsultarListaDeCobrancas.queryKey(searchParams),
    queryFn: () => queryConsultarListaDeCobrancas(searchParams),
    ...options
  })
}
useQueryConsultarListaDeCobrancas.queryKey = (searchParams) =>
  ['/cob/', searchParams].filter(Boolean)

export const queryConsultarListaDeCobrancas = (searchParams) => instance.get('/cob/', { params: searchParams })

export const useMutationSolicitarDevolucao = (
  pathParams,
  options = {}
) => useMutation({
  mutationFn: (input) => mutationSolicitarDevolucao(input, pathParams),
  ...options
})

export const mutationSolicitarDevolucao = (input, pathParams) => instance.put(replacePathParams('/pix/{e2eid}/devolucao/{id}', pathParams), input)

export function useQueryConsultarDevolucao(
  pathParams,
  options = {}
) {
  return useQuery({
    queryKey: useQueryConsultarDevolucao.queryKey(pathParams),
    queryFn: () => queryConsultarDevolucao(pathParams),
    ...options
  })
}
useQueryConsultarDevolucao.queryKey = (pathParams) =>
  ['/pix/{e2eid}/devolucao/{id}', pathParams].filter(Boolean)

export const queryConsultarDevolucao = (pathParams) => instance.get(replacePathParams('/pix/{e2eid}/devolucao/{id}', pathParams))

export function useQueryConsultarPix(
  pathParams,
  options = {}
) {
  return useQuery({
    queryKey: useQueryConsultarPix.queryKey(pathParams),
    queryFn: () => queryConsultarPix(pathParams),
    ...options
  })
}
useQueryConsultarPix.queryKey = (pathParams) =>
  ['/pix/{e2eid}', pathParams].filter(Boolean)

export const queryConsultarPix = (pathParams) => instance.get(replacePathParams('/pix/{e2eid}', pathParams))

export function useQueryConsultarPixRecebidos(
  searchParams,
  options = {}
) {
  return useQuery({
    queryKey: useQueryConsultarPixRecebidos.queryKey(searchParams),
    queryFn: () => queryConsultarPixRecebidos(searchParams),
    ...options
  })
}
useQueryConsultarPixRecebidos.queryKey = (searchParams) =>
  ['/pix', searchParams].filter(Boolean)

export const queryConsultarPixRecebidos = (searchParams) => instance.get('/pix', { params: searchParams })

export function useQueryRecuperarOPayloadJsonQueRepresentaACobranca(
  pathParams,
  options = {}
) {
  return useQuery({
    queryKey: useQueryRecuperarOPayloadJsonQueRepresentaACobranca.queryKey(pathParams),
    queryFn: () => queryRecuperarOPayloadJsonQueRepresentaACobranca(pathParams),
    ...options
  })
}
useQueryRecuperarOPayloadJsonQueRepresentaACobranca.queryKey = (pathParams) =>
  ['/{pixUrlAcessToken}', pathParams].filter(Boolean)

export const queryRecuperarOPayloadJsonQueRepresentaACobranca = (pathParams) => instance.get(replacePathParams('/{pixUrlAcessToken}', pathParams))

export const useMutationConfigurarOWebhookPix = (
  options = {}
) => useMutation({
  mutationFn: (input) => mutationConfigurarOWebhookPix(input),
  ...options
})

export const mutationConfigurarOWebhookPix = (input) => instance.put('/webhook', input)

export const useQueryExibirInformacoesAcercaDoWebookPix = (
  options = {},
  config
) => useQuery({
  queryKey: useQueryExibirInformacoesAcercaDoWebookPix.queryKey(),
  queryFn: () => queryExibirInformacoesAcercaDoWebookPix(config),
  ...options
})
useQueryExibirInformacoesAcercaDoWebookPix.queryKey = () => '/webhook'

export const queryExibirInformacoesAcercaDoWebookPix = (config) => instance.get('/webhook', config)

export const useMutationCancelarOWebhookPix = (
  options = {}
) => useMutation({
  mutationFn: () => mutationCancelarOWebhookPix(),
  ...options
})

export const mutationCancelarOWebhookPix = () => instance.delete('/webhook')

