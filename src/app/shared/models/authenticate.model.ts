import { GenericData } from "./generic-data.model";
import { User } from "./users.model";

export interface AuthenticateLogin extends GenericData {
  data: AuthenticateLoginData;
}

export interface AuthenticateLoginData extends GenericData {
  token: string;
  user: User;
  fromApp: boolean;
}

export interface ForgotPasswordRes extends GenericData {
  data: ForgotPasswordData;
}

export interface ForgotPasswordData {
  telephone: string;
  userID: number;
  token: string;
}
