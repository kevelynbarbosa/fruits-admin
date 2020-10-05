import { http } from 'hooks/useHttpInterceptor'
import { HttpResponseType } from 'interfaces/Http'
import { LoginRequestType } from 'interfaces/user'

import { UsuarioLogadoResponseType } from '../interfaces/Auth/responses/index'

export const signIn = async (loginData: LoginRequestType): Promise<UsuarioLogadoResponseType> => {
  const { data } = await http.post<HttpResponseType<UsuarioLogadoResponseType>>('usuarios/login', loginData)
  return data.success ? data.data : ({} as UsuarioLogadoResponseType)
}
export function signOut(): null {
  return null
}
