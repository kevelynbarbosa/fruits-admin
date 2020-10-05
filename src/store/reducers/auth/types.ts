export const ACCEPT_TERMS = 'ACCEPT_TERMS'
export const TIME_TO_EXPIRE = 'TIME_TO_EXPIRE'

export interface ReducerAuthState {
  termoUsoAceito: boolean
  tempoExpiracao: number
}

export interface AcceptTerms {
  type: typeof ACCEPT_TERMS
  payload: boolean
}

export interface TimeToExpire {
  type: typeof TIME_TO_EXPIRE
  payload: number
}
export type ConfigActionTypes = AcceptTerms | TimeToExpire
