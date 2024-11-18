export interface User {
  id: number,
  first_name: string,
  last_name: string,
  username: string,
  email?: string,
  document: string,
  telephone: string,
  gender: string,
  profile_image?: string,
  active: number,
  points?: number,
  last_login?: string
  roles: roles[]
}

export interface roles {
  name: string,
  pivot: { user_id: number, role_id: number }
}
