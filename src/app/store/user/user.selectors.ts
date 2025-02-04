import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import * as FromUser from './user.reducer';
import { User } from '../../shared/models/users';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectAllUsers = createSelector(
    selectUserState,
    FromUser.selectAll
);

export const selectGymMembers = createSelector(
    selectAllUsers,
    (users: User[]) => users.filter(user => user.roles.some(role => role.name === 'user'))
);

export const selectUserById = (id: number) => createSelector(
    selectAllUsers,
    (users: User[]) => users.find((user) => user.id === id)
);

export const allUsersLoaded = createSelector(
    selectUserState,
    (state: UserState) => state.allUsersLoaded
); 