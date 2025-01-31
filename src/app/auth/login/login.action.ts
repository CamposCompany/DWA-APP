import { createAction, props } from "@ngrx/store";
import { User } from "../../shared/models/users";

export const login = createAction(
    "[Login Page] User Login",
    props<{user: User}>()
)

export const logout = createAction(
    "[Logout Menu] User logout"
)