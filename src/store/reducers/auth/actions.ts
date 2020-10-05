import { ACCEPT_TERMS, TIME_TO_EXPIRE } from './types'

const acceptTerms = (payload: boolean) => ({
  type: ACCEPT_TERMS,
  payload: payload,
})

const setTimeToExpire = (payload: number) => ({
  type: TIME_TO_EXPIRE,
  payload: payload,
})

export { acceptTerms, setTimeToExpire }
