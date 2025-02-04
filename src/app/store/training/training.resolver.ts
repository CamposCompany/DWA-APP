import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { concatMap, map } from 'rxjs/operators';
import { TrainingActions } from './action-types';
import { allTrainingsLoaded } from './training.selectors';
import { AppState } from '..';
import { isAdminSelector } from '../../auth/login/store/auth.selectors';
import { filter, first, tap, finalize } from 'rxjs/operators';

export const trainingResolver: ResolveFn<boolean> = (route, state) => {
  let loading = false;
  const store = inject(Store<AppState>);

  return store.pipe(
    select(isAdminSelector),
    concatMap(isAdmin => 
      store.pipe(
        select(allTrainingsLoaded),
        first(),
        tap(loaded => {
          if (!loaded && !loading) {
            loading = true;
            store.dispatch(TrainingActions.loadTrainings({ isAdmin }));
          }
        }),
        concatMap(() => store.pipe(
          select(allTrainingsLoaded),
          filter(loaded => loaded),
          first()
        )),
        finalize(() => {
          loading = false;
        })
      )
    ),
    map(() => true)
  );
};
