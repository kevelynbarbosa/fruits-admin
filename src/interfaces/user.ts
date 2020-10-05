

export interface DefaultUserType {
  id: string
  name: string
  email: string
  phone: string
  photo: string
  type: string
}

export interface LoginResponseType {
  token: string
  user: DefaultUserType
}

// FIXME: tornar obrigatorio o captcha no request
export interface LoginRequestType {
  login: string
  senha: string
  captcha: any
}
