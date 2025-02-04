import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { first, tap, map, filter, finalize } from 'rxjs/operators';
import { UserActions } from './action-types';
import { allUsersLoaded } from './user.selectors';
import { AppState } from '..';

export const userResolver: ResolveFn<boolean> = (route, state) => {
  let loading = false;
  const store = inject(Store<AppState>);

  return store.pipe(
    select(allUsersLoaded),
    tap(loaded => {
      if (!loaded && !loading) {
        loading = true;
        store.dispatch(UserActions.loadUsers());
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