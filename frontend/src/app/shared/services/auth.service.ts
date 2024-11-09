import { Injectable } from '@angular/core';
import { Http } from './http.service';
import { Observable } from 'rxjs';
import { AuthenticateLogin, ForgotPasswordRes } from '../models/authenticate';
import { FormGroup } from '@angular/forms';

@Injectable()
export class AuthService {
  private routeLogin: string = 'login';

  private routeResetPasswordStep1: string = 'forgot-password-step1';
  private routeResetPasswordStep2: string = 'forgot-password-step2';
  private routeResetLastStep: string = 'reset-password';

  constructor(private http: Http) { }

  authenticate(auth: FormGroup): Observable<AuthenticateLogin> {
    return this.http.post(`${this.routeLogin}`, auth);
  }

  resetPasswordStep1(document: string): Observable<ForgotPasswordRes> {
    return this.http.post(`${this.routeResetPasswordStep1}`, document);
  }

  resetPasswordStep2(payload: { document: string; telephone: number }): Observable<ForgotPasswordRes> {
    return this.http.post(`${this.routeResetPasswordStep2}`, payload);
  }

  resetPasswordLastStep(payload: { password: string, confirm_password: string, token: string, id: number }): Observable<ForgotPasswordRes> {
    return this.http.post(`${this.routeResetLastStep}`, payload);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
