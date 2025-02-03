import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthAction } from './action.types';
import { tap } from 'rxjs';
import { Router } from '@angular/router';



@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.login),
    tap((action) => {
      localStorage.setItem('token', action.token);
      localStorage.setItem('user', JSON.stringify(action.user));
    })), { dispatch: false }
  )

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.logout),
    tap(() => {
      this.router.navigate(['/login']);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    })
  ), { dispatch: false })
}
