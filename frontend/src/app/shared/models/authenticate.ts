export interface AuthenticateLogin extends GenericData {
  data: AuthenticateLoginData;
}

export interface AuthenticateLoginData extends GenericData {
  token: string;
  user: any;
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
