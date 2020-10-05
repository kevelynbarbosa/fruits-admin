export const teste = null
// import axios from 'axios'
// import settings from 'config/settings.json'
// import qs from 'qs'
// import Swal from 'sweetalert2'

// import { store } from '../store/index'
// import { getToken } from './storage'

// function getUrl() {
//   if (window.location.hostname === 'localhost') {
//     // return settings.serviceUrlAzure
//     return settings.serviceUrlLocal
//   }
//   if (window.location.hostname === 'front-vix-backoffice-dev.azurewebsites.net') {
//     return settings.serviceUrlAzure
//   }
//   return settings.serviceUrl
// }

// const URL_BASE = getUrl()
// const token = getToken()

// const configuredAxios = axios.create({
//   baseURL: URL_BASE,
//   headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*',
//     Authorization: `Bearer ${token}`,
//   },
//   paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
// })

// // interceptor
// configuredAxios.interceptors.response.use((config) => {
//   store.dispatch({ type: 'HANDLE_LOADING', payload: true })
//   // console.log('passou aqui')
//   return config
// })

// configuredAxios.interceptors.response.use(
//   (response) => {
//     store.dispatch({ type: 'HANDLE_LOADING', payload: false })
//     // console.log('response')
//     return response
//   },
//   (error) => {
//     if (error.response) {
//       // console.log('Interceptor Erro: ', error.response)
//       const { status, data } = error.response
//       const mensagem = status !== 500 ? data.messages.join('<br>') : '500 - Erro ao processar a informação!'
//       Swal.fire('Ooops!', mensagem, 'error')
//       store.dispatch({ type: 'HANDLE_LOADING', payload: false })
//     }
//     return Promise.reject(error)
//   },
// )

// export default configuredAxios
