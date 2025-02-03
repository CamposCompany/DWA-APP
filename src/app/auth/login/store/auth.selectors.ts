import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from ".";



export const selectAuthState = createFeatureSelector<AuthState>("login")

export const tokenSelector = createSelector(
    selectAuthState,
    (state) => state.token
);

export const selectUser = createSelector(
    selectAuthState,
    (state) => state.user
);

export const isAdminSelector = createSelector(
    selectUser,
    (user) => user?.roles.some((role) => role.name === 'admin')
);
