import {
  createReducer,
  on,
} from '@ngrx/store';
import { User } from '../../../../shared/models/users';
import { AuthAction } from '../action.types';


export interface AuthState {
  user: User
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
  }
}

export const authReducer = createReducer(
  initialAuthState,
  on(AuthAction.login, (state, action) => {
    return {
      user: action.user
    }
  })
)