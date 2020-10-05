import uuid from 'react-uuid'

import { UsuarioLogadoType, BootstatusType } from '../interfaces/Auth/responses/index'

// Dados do usuário
export const setUser = (user: UsuarioLogadoType): null => {
  localStorage.setItem('@VixAuth:user', JSON.stringify(user))
  return null
}

export const getUser = (): UsuarioLogadoType | null => {
  const storedUser = localStorage.getItem('@VixAuth:user')
  return storedUser ? JSON.parse(storedUser) : null
}

export const setToken = (token: string): null => {
  localStorage.setItem('@VixAuth:uuid', uuid)
  localStorage.setItem('@VixAuth:token', token)
  return null
}

export const getToken = (): string | null => localStorage.getItem('@VixAuth:token')

export const getBootstatus = (): BootstatusType => {
  const bootstatus = localStorage.getItem('@Vix:Bootstatus')
  return bootstatus ? JSON.parse(bootstatus) : null
}

export const getAcoesUsuario = (urlPagina: string): string[] => {
  const permisssoes = localStorage.getItem('@VixAuth:permissoes')

  if (permisssoes) {
    const permissoesUsuario = JSON.parse(permisssoes)
    const permissoesPagina = permissoesUsuario.filter((x) => x.pagina.url === urlPagina)
    const acoes = permissoesPagina.map((x) => x.acao)
    const descricoes = acoes.map((x) => x.descricao)
    return descricoes
  }
  return []
}

export const setGenericStorage = (objectName: string, objectValue: any): void => {
  localStorage.setItem(objectName, JSON.stringify(objectValue))
}

export const getGenericStorage = (objectName: string): any => {
  const stored = localStorage.getItem(objectName)
  return stored ? JSON.parse(stored) : null
}

export const removeGenericStorage = (objectName: string): void => {
  localStorage.removeItem(objectName)
}
