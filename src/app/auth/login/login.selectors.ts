import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginState } from "./reducers";
import { User } from "../../shared/models/users";

export const selectLoginState = createFeatureSelector<LoginState>("login")

export const isAdminSelector = createSelector(
    selectLoginState,
    login => login.user.roles.some((role) => role.name === 'admin')
);