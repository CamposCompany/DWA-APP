export interface AuthenticateLogin {
  data: AuthenticateLoginData
  message: string
}

export interface AuthenticateLoginData {
  token: string
  user: any
}
