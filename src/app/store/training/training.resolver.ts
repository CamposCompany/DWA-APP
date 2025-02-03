import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { first, tap, map } from 'rxjs/operators';
import { TrainingActions } from './action-types';
import { allTrainingsLoaded } from './training.selectors';
import { AppState } from '..';
import { isAdminSelector } from '../../auth/login/store/auth.selectors';

export const trainingResolver: ResolveFn<boolean> = (route, state) => {
  const store = inject(Store<AppState>);
  
  return store.pipe(
    select(isAdminSelector),
    first(),
    tap(isAdmin => {
      if (isAdmin) {
        store.pipe(
          select(allTrainingsLoaded),
          first(),
          tap(loaded => {
            if (!loaded) {
              store.dispatch(TrainingActions.loadAllTrainings());
            }
          })
        ).subscribe();
      } else {
        store.pipe(
          select(allTrainingsLoaded),
          first(),
          tap(loaded => {
            if (!loaded) {
              store.dispatch(TrainingActions.loadUserTrainings());
            }
          })
        ).subscribe();
      }
    }),
    map(() => true)
  );
};
