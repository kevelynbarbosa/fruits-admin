import axios from 'axios'
import settings from 'config/settings.json'
import qs from 'qs'
import { getToken } from 'services/storage'
import Swal from 'sweetalert2'

import { store } from '../store/index'

function getUrl() {
  if (window.location.hostname === 'localhost') {
    return settings.serviceUrlLocal
  }
  if (
    window.location.hostname === 'front-vix-backoffice-dev.azurewebsites.net'
  ) {
    return settings.serviceUrlAzure
  }
  if (window.location.hostname === 'hmgvaptjornada.aguiabranca.com.br') {
    return settings.serviceUrlHmgGAB
  }
  if (window.location.hostname === 'devvaptjornada.aguiabranca.com.br') {
    return settings.serviceUrlDevGAB
  }
  return settings.serviceUrl
}

const URL_BASE = getUrl()
const token = getToken()

export const http = axios.create({
  baseURL: URL_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`,
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response
      let mensagem = ''
      switch (status) {
        case 400:
          store.dispatch({ type: 'HANDLE_LOADING', payload: false })
          mensagem = data?.messages
            ? data.messages.join('<br/>')
            : '400 - Dados inválidos!<br>Tente novamente.'
          Swal.fire({ title: 'Atenção', html: mensagem, icon: 'warning' })
          return error.response
        case 401:
          mensagem = data?.messages
            ? data.messages.join('<br/>')
            : '401 - Acesso negado!<br>Faça login e tente novamente.'

          store.dispatch({ type: 'HANDLE_LOADING', payload: false })

          Swal.fire({ title: 'Atenção', html: mensagem, icon: 'warning' }).then(
            () => {
              localStorage.clear()
              const loc = window.location
              window.location.href = `${loc.protocol}//${loc.host}`
            },
          )
          return error.response
        default:
          store.dispatch({ type: 'HANDLE_LOADING', payload: false })
          mensagem = data?.messages
            ? data.messages.join('<br/>')
            : '500 - Erro ao processar a informação!'
          Swal.fire({ title: 'Atenção', html: mensagem, icon: 'warning' })
          return error.response
      }
    }
    return Promise.reject(error)
  },
)
