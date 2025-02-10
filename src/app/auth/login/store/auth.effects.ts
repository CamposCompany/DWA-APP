import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './action.types';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { TrainingActions } from '../../../store/training/action-types';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { ExerciseActions } from '../../../store/exercise/action-types';


@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);
  private readonly store = inject(Store<AppState>);

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    tap((action) => {
      localStorage.setItem('token', action.token);
      localStorage.setItem('user', JSON.stringify(action.user));
    })), { dispatch: false }
  )

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('user');
          this.store.dispatch(TrainingActions.resetTrainingState());
          this.store.dispatch(ExerciseActions.resetExerciseState());
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  )
}
