import {
  ReducerLayoutState,
  ConfigActionTypes,
  TOGGLE_LEFT_SIDEBAR,
  TOGGLE_RIGHT_SIDEBAR,
  TOGGLE_FILTER,
  TOGGLE_NOTIFICATION,
  HANDLE_LOADING,
  HANDLE_UPDATE,
} from './types'

const INITIAL_STATE: ReducerLayoutState = {
  leftSidebarToggled: true,
  rightSidebarToggled: false,
  filterToggled: false,
  notificationToggled: false,
  loading: false,
  update: 0,
}

const reducers = (state = INITIAL_STATE, { type, payload }: ConfigActionTypes) => {
  switch (type) {
    case TOGGLE_LEFT_SIDEBAR:
      return {
        ...state,
        leftSidebarToggled: payload,
      }
    case TOGGLE_RIGHT_SIDEBAR:
      return {
        ...state,
        rightSidebarToggled: payload,
      }
    case TOGGLE_FILTER:
      return {
        ...state,
        filterToggled: payload,
      }
    case TOGGLE_NOTIFICATION:
      return {
        ...state,
        notificationToggled: payload,
      }
    case HANDLE_LOADING:
      return {
        ...state,
        loading: payload,
      }
    case HANDLE_UPDATE:
      return {
        ...state,
        loading: +payload,
      }
    default:
      return state
  }
}

export default reducers
