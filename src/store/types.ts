import { ReducerAuthState } from './reducers/auth/types'
import { ReducerLayoutState } from './reducers/layout/types'

export interface ReduxState {
  layoutReducer: ReducerLayoutState
  authReducer: ReducerAuthState
}
