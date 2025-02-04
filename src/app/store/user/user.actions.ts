import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/models/users';

export const loadUsers = createAction(
  '[Users] Load Users'
);

export const allUsersLoaded = createAction(
  '[Users] Users Loaded',
  props<{ users: User[] }>()
);

export const setCurrentUser = createAction(
  '[Users] Set Current User',
  props<{ user: User }>()
);

export const resetUserState = createAction(
  '[Users] Reset State'
); 