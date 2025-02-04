import {
  createReducer,
  on,
} from '@ngrx/store';
import { User } from '../../../shared/models/users';
import { AuthActions } from './action.types';



export interface AuthState {
  user: User;
  token: string
}

export const initialAuthState: AuthState = {
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
  },
  token: ''
}

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state, action) => {
    return {
      user: action.user,
      token: action.token
    }
  }),

  on(AuthActions.logout, (state) => {
    return {
      user: initialAuthState.user,
      token: initialAuthState.token
    }
  })
)