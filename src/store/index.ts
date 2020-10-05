import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

// Layout Reducers
import authReducer from './reducers/auth/reducers'
import layoutReducer from './reducers/layout/reducers'

const rootReducer = combineReducers({
  layoutReducer,
  authReducer,
})

// eslint-disable-next-line max-len
// const ReduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()

export const store = createStore(
  rootReducer,
  undefined,
  compose(applyMiddleware(thunk)),
)
