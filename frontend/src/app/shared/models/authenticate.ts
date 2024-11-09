export interface AuthenticateLogin extends GenericData {
  data: AuthenticateLoginData;
}

export interface AuthenticateLoginData extends GenericData {
  token: string;
  user: User;
}

export interface ForgotPasswordRes extends GenericData {
  data: ForgotPasswordData;
}

export interface ForgotPasswordData {
  telephone: string;
  userId: number;
}

export interface GenericData {
  message: string;
  error?: boolean;
}

export interface User {
  id: 16,
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  document: string,
  telephone: string,
  gender: string,
  profile_image: string,
  active: number,
  points: number,
  last_login: string
}