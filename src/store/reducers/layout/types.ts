export const TOGGLE_LEFT_SIDEBAR = 'TOGGLE_LEFT_SIDEBAR'
export const TOGGLE_RIGHT_SIDEBAR = 'TOGGLE_RIGHT_SIDEBAR'
export const TOGGLE_NOTIFICATION = 'TOGGLE_NOTIFICATION'
export const TOGGLE_FILTER = 'TOGGLE_FILTER'
export const HANDLE_LOADING = 'HANDLE_LOADING'
export const HANDLE_UPDATE = 'HANDLE_UPDATE'

export interface ReducerLayoutState {
  leftSidebarToggled: boolean
  rightSidebarToggled: boolean
  filterToggled: boolean
  notificationToggled: boolean
  loading: boolean
  update: number
}

export interface ToggleLeftSidebar {
  type: typeof TOGGLE_LEFT_SIDEBAR
  payload: boolean
}

export interface ToggleRightSidebar {
  type: typeof TOGGLE_RIGHT_SIDEBAR
  payload: boolean
}

export interface ToggleFilter {
  type: typeof TOGGLE_FILTER
  payload: boolean
}

export interface ToggleNotification {
  type: typeof TOGGLE_NOTIFICATION
  payload: boolean
}

export interface HandleLoading {
  type: typeof HANDLE_LOADING
  payload: boolean
}
export interface HandleUpdate {
  type: typeof HANDLE_UPDATE
  payload: number
}

export type ConfigActionTypes =
  | ToggleLeftSidebar
  | ToggleRightSidebar
  | ToggleFilter
  | ToggleNotification
  | HandleLoading
  | HandleUpdate
