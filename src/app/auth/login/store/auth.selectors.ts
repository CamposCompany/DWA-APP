import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";


export const selectAuthState = createFeatureSelector<AuthState>("login")

export const selectUser = createSelector(
    selectAuthState,
    (state) => state.user
);

export const isAdminSelector = createSelector(
    selectUser,
    (user) => { console.log(user?.roles.some((role) => role.name === 'admin')); return user?.roles.some((role) => role.name === 'admin'); }
);
