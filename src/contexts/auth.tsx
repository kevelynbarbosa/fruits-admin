/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { UsuarioLogadoResponseType, UsuarioLogadoType } from 'interfaces/Auth/responses'
import { LoginRequestType } from 'interfaces/user'
import * as auth from 'services/auth'

interface AuthContextData {
  signed: boolean
  loading: boolean
  user: UsuarioLogadoType | null
  signIn(loginData: LoginRequestType, loggedData: UsuarioLogadoResponseType): Promise<UsuarioLogadoResponseType>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UsuarioLogadoType | null>(null)
  const [loading, setLoading] = useState(false)

  const history = useHistory()
  useEffect(() => {
    async function loadStoragedData() {
      setLoading(true)
      const storagedUser = localStorage.getItem('@VixAuth:user')
      const storagedToken = localStorage.getItem('@VixAuth:token')

      if (storagedUser && storagedToken && storagedUser !== undefined && storagedToken !== undefined) {
        setUser(JSON.parse(storagedUser))
      }
      setLoading(false)
    }

    loadStoragedData()
  }, [])

  async function handleSetStorages(loggedData: UsuarioLogadoResponseType): Promise<UsuarioLogadoResponseType> {
    localStorage.setItem('@VixAuth:user', JSON.stringify(loggedData.user))
    localStorage.setItem('@VixAuth:token', loggedData.token)
    localStorage.setItem('@Vix:Bootstatus', JSON.stringify(loggedData.bootStatus))
    localStorage.setItem('@VixAuth:permissoes', JSON.stringify(loggedData.permissoes))
    return loggedData
  }

  async function signIn(loginData: LoginRequestType, loggedData: UsuarioLogadoResponseType) {
    setLoading(true)

    let response = {} as UsuarioLogadoResponseType

    if (loginData.login && loginData.captcha && loginData.senha) {
      response = await auth.signIn(loginData)
      if (response.user && response.token && response.bootStatus) {
        await handleSetStorages(response)
      }
      setLoading(false)
    } else if (loggedData !== null) {
      response = await handleSetStorages(loggedData)
      setLoading(false)
    }

    if (response) {
      // console.log(response)
      setUser(response.user)
      history.push('/')
    }
    setLoading(false)

    return response
  }

  function signOut() {
    setLoading(true)
    localStorage.clear()
    setUser(null)
    setLoading(false)
    history.push('/')
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loading,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
