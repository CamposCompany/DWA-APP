export interface AuthenticateLogin {
  data: AuthenticateLoginData
  message: string
}

export interface AuthenticateLoginData {
  token: string
  user: User
}

export interface User {
  id: 1,
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  document: string,
  last_login: string,
  telephone: string,
  gender: string,
  profile_image: string,
  active: number,
  points: number,
}