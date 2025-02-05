import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { concatMap, filter, first, tap } from 'rxjs/operators';
import { TrainingActions } from './action-types';
import { allTrainingsLoaded } from './training.selectors';
import { AppState } from '..';
import { isAdminSelector } from '../../auth/login/store/auth.selectors';

let isLoading = false;

export const trainingResolver: ResolveFn<boolean> = (route, state) => {
  const store = inject(Store<AppState>);

  return store.pipe(
    select(isAdminSelector),
    first(),
    concatMap(isAdmin => {
      return store.pipe(
        select(allTrainingsLoaded),
        tap(loaded => {
          if (!loaded && !isLoading) {
            isLoading = true;
            store.dispatch(TrainingActions.loadTrainings({ isAdmin }));
          }
        }),
        filter(loaded => loaded),
        first(),
        tap(() => {
          isLoading = false;
        })
      );
    })
  );
};
