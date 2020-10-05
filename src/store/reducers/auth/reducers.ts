import { ReducerAuthState, ConfigActionTypes, ACCEPT_TERMS, TIME_TO_EXPIRE } from './types'

const INITIAL_STATE: ReducerAuthState = {
  termoUsoAceito: false,
  tempoExpiracao: 1,
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const reducers = (state = INITIAL_STATE, { type, payload }: ConfigActionTypes) => {
  switch (type) {
    case ACCEPT_TERMS:
      return { ...state, termoUsoAceito: payload }
    case TIME_TO_EXPIRE:
      return { ...state, tempoExpiracao: payload }
    default:
      return state
  }
}

export default reducers
