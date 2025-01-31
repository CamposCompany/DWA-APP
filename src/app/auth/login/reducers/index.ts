import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
  State
} from '@ngrx/store';
import { User } from '../../../shared/models/users';
import { LoginAction } from '../action.types';


export interface LoginState {
  user: User
}

export const initialLoginState: LoginState = {
  user: {
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    document: '',
    telephone: '',
    gender: '',
    active: 0,
    roles: []
  }
}

export const loginReducer = createReducer(
  initialLoginState,
  on(LoginAction.login, (state, action) => {
    return {
      user: action.user
    }
  })
)