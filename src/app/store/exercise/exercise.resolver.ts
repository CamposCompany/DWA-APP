import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { first, tap, map, filter, finalize } from 'rxjs/operators';
import { ExerciseActions } from './action-types';
import { allExercisesLoaded } from './exercise.selectors';
import { AppState } from '..';

export const exerciseResolver: ResolveFn<boolean> = (route, state) => {
  let loading = false;
  const store = inject(Store<AppState>);

  return store.pipe(
    select(allExercisesLoaded),
    tap(loaded => {
      if (!loaded && !loading) {
        loading = true;
        store.dispatch(ExerciseActions.loadExercises({ paginate: false }));
      }
    }),
    filter(loaded => loaded),
    first(),
    finalize(() => {
      loading = false;
    }),
    map(() => true)
  );
}; 