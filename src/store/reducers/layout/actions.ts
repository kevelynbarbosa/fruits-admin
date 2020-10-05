import {
  TOGGLE_LEFT_SIDEBAR,
  TOGGLE_RIGHT_SIDEBAR,
  TOGGLE_FILTER,
  TOGGLE_NOTIFICATION,
  HANDLE_LOADING,
  HANDLE_UPDATE,
} from './types'

const toggleLeftSidebar = (payload: boolean) => ({
  type: TOGGLE_LEFT_SIDEBAR,
  payload,
})

const toggleRightSidebar = (payload: boolean) => ({
  type: TOGGLE_RIGHT_SIDEBAR,
  payload,
})

const toggleFilter = (payload: boolean) => ({
  type: TOGGLE_FILTER,
  payload,
})

const toggleNotification = (payload: boolean) => ({
  type: TOGGLE_NOTIFICATION,
  payload,
})

const handleLoading = (payload: boolean) => ({
  type: HANDLE_LOADING,
  payload,
})

const handleUpdate = (payload: number) => ({
  type: HANDLE_UPDATE,
  payload,
})

// eslint-disable-next-line object-curly-newline
export { toggleLeftSidebar, toggleRightSidebar, toggleFilter, toggleNotification, handleLoading, handleUpdate }
