import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../../shared/models/users';
import { AuthenticateLogin, ForgotPasswordRes } from '../../shared/models/authenticate';
import { AuthState } from '../login/store';


@Injectable({
  providedIn: 'root'
})
export class AuthDataService extends DefaultDataService<AuthState> {
  private readonly baseUrl = 'https://campos-portfolio.net/api';

  constructor(
    protected override http: HttpClient, 
    httpUrlGenerator: HttpUrlGenerator,
  ) {
    super('Auth', http, httpUrlGenerator);
  }

  override getAll(): Observable<AuthState[]> {
    return this.http.get<any>(`${this.baseUrl}/auth`).pipe(
      map(response => response.user)
    );
  }

  authenticate(credentials: { document: string; password: string, fromApp: boolean }): Observable<AuthenticateLogin> {
    return this.http.post<AuthenticateLogin>(`${this.baseUrl}/auth/login`, credentials);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('token');
      })
    );
  }

  resetPasswordStep1(document: string): Observable<ForgotPasswordRes> {
    return this.http.post<ForgotPasswordRes>(`${this.baseUrl}/auth/forgot-password-step1`, { document });
  }

  resetPasswordStep2(payload: { document: string; telephone: number }): Observable<ForgotPasswordRes> {
    return this.http.post<ForgotPasswordRes>(`${this.baseUrl}/auth/forgot-password-step2`, payload);
  }

  resetPasswordLastStep(payload: {
    password: string;
    confirm_password: string;
    token: string;
    id: number;
  }): Observable<ForgotPasswordRes> {
    return this.http.post<ForgotPasswordRes>(`${this.baseUrl}/auth/reset-password`, payload);
  }
} 