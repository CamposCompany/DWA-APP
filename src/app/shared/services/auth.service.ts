import { inject, Injectable } from '@angular/core';
import { Http } from './http.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthenticateLogin, ForgotPasswordRes } from '../models/authenticate';
import { Store } from '@ngrx/store';
import { login, logout } from '../../auth/login/store/auth.action';
import { tokenSelector } from '../../auth/login/store/auth.selectors';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(Http);
  private readonly store = inject(Store);
  private token: string = '';

  constructor() {
    this.store.select(tokenSelector).subscribe((token) => {
      this.token = token;
    });
  }

  private readonly routes = {
    login: 'auth/login',
    logout: 'auth/logout',
    resetPasswordStep1: 'auth/forgot-password-step1',
    resetPasswordStep2: 'auth/forgot-password-step2',
    resetLastStep: 'auth/reset-password'
  } as const;

  private readonly authStateSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  readonly authState$ = this.authStateSubject.asObservable();

  authenticate(credentials: { document: string; password: string, fromApp: boolean }): Observable<AuthenticateLogin> {
    return this.http.post<{ document: string; password: string, fromApp: boolean }, AuthenticateLogin>(this.routes.login, credentials).pipe(
      tap(({ data: { user, token } }) => {
        this.authStateSubject.next(true);
        this.store.dispatch(login({ user, token }));
      })
    );
  }

  resetPasswordStep1(document: string): Observable<ForgotPasswordRes> {
    return this.http.post<{ document: string }, ForgotPasswordRes>(this.routes.resetPasswordStep1, { document });
  }

  resetPasswordStep2(payload: { document: string; telephone: number }): Observable<ForgotPasswordRes> {
    return this.http.post<{ document: string; telephone: number }, ForgotPasswordRes>(this.routes.resetPasswordStep2, payload);
  }

  resetPasswordLastStep(payload: {
    password: string;
    confirm_password: string;
    token: string;
    id: number;
  }): Observable<ForgotPasswordRes> {
    return this.http.post<{ password: string; confirm_password: string; token: string; id: number }, ForgotPasswordRes>(this.routes.resetLastStep, payload);
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  getToken(): string {
    return this.token;
  }

  logout(): Observable<void> {
    return this.http.post<unknown, void>(this.routes.logout, {}).pipe(
      tap(() => {
        localStorage.removeItem('token');
        this.authStateSubject.next(false);
        this.store.dispatch(logout());
      })
    );
  }
}
