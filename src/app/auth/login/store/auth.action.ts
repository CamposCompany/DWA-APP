import { createAction, props } from "@ngrx/store";
import { User } from "../../../shared/models/users.model";

export const login = createAction(
    "[Login Page] User Login",
    props<{ user: User, token: string, fromApp: boolean }>()
)

export const logout = createAction(
    "[Logout Menu] User logout"
)

export const updateUser = createAction(
    "[Update User] Update User",
    props<{ user: User }>()
)