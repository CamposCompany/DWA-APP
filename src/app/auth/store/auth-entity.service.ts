import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { User } from '../../shared/models/users';
import { Observable, tap, map, BehaviorSubject } from 'rxjs';
import { AuthenticateLogin, ForgotPasswordRes } from '../../shared/models/authenticate';
import { AuthDataService } from './auth-data.service';

interface AuthState {
    user: User;
    token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthEntityService extends EntityCollectionServiceBase<AuthState> {
    private isAdminSubject = new BehaviorSubject<boolean>(false);
    private tokenSubject = new BehaviorSubject<string>('');
    private currentUserSubject = new BehaviorSubject<User>({} as User);

    readonly isAdmin$ = this.isAdminSubject.asObservable();
    readonly token$ = this.tokenSubject.asObservable();
    readonly currentUser$ = this.currentUserSubject.asObservable();

    readonly authState$ = this.entities$.pipe(
        map(entities => entities[0]),
        tap(state => {
            if (state?.user) {
                this.currentUserSubject.next(state.user);
                this.isAdminSubject.next(state.user.roles.map(role => role.name).includes('admin'));
            }
            if (state?.token) {
                this.tokenSubject.next(state.token);
            }
        })
    );

    constructor(
        serviceElementsFactory: EntityCollectionServiceElementsFactory,
        private authDataService: AuthDataService,
    ) {
        super('Auth', serviceElementsFactory);
        this.authState$.subscribe();
    }

    getCurrentUser(): User {
        return this.currentUserSubject.getValue();
    }

    getIsAdmin(): boolean {
        return this.isAdminSubject.getValue();
    }

    getToken(): string {
        return this.tokenSubject.getValue();
    }

    authenticate(credentials: { document: string; password: string, fromApp: boolean }): Observable<AuthenticateLogin> {
        return this.authDataService.authenticate(credentials).pipe(
            tap((response: AuthenticateLogin) => {
                if (response.data.token) {
                    this.addOneToCache({ user: response.data.user, token: response.data.token });
                    this.tokenSubject.next(response.data.token);
                    localStorage.setItem('token', response.data.token);
                }
            })
        );
    }

    logout(): Observable<void> {
        return this.authDataService.logout().pipe(
            tap(() => {
                this.isAdminSubject.next(false);
                this.tokenSubject.next('');
                localStorage.removeItem('token');
                this.clearCache();
            })
        );
    }

    resetPasswordStep1(document: string): Observable<ForgotPasswordRes> {
        return this.authDataService.resetPasswordStep1(document);
    }

    resetPasswordStep2(payload: { document: string; telephone: number }): Observable<ForgotPasswordRes> {
        return this.authDataService.resetPasswordStep2(payload);
    }

    resetPasswordLastStep(payload: {
        password: string;
        confirm_password: string;
        token: string;
        id: number;
    }): Observable<ForgotPasswordRes> {
        return this.authDataService.resetPasswordLastStep(payload);
    }
} 