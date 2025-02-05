import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, first, tap } from 'rxjs/operators';
import { ExerciseActions } from './action-types';
import { allExercisesLoaded } from './exercise.selectors';
import { AppState } from '..';

let isLoading = false;

export const exerciseResolver: ResolveFn<boolean> = (route, state) => {
  const store = inject(Store<AppState>);

  return store.pipe(
    select(allExercisesLoaded),
    tap(loaded => {
      if (!loaded && !isLoading) {
        isLoading = true;
        store.dispatch(ExerciseActions.loadExercises({ paginate: false }));
      }
    }),
    filter(loaded => loaded),
    first(),
    tap(() => {
      isLoading = false;
    })
  );
}; 