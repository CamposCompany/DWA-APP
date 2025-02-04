import { createReducer, on } from '@ngrx/store';

import { User } from '../../shared/models/users';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserActions } from './action-types';

export const userFeatureKey = 'user';

export interface UserState extends EntityState<User> {
  allUsersLoaded: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UserState = adapter.getInitialState({
  allUsersLoaded: false
});

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({
    ...state,
    allUsersLoaded: false
  })),

  on(UserActions.allUsersLoaded, (state, action) => 
    adapter.setAll(action.users, {
      ...state,
      allUsersLoaded: true
    })
  ),

  on(UserActions.resetUserState, () => initialState)
);

export const { selectAll } = adapter.getSelectors(); 