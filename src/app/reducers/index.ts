import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from '../auth/login/store/reducers';

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  login: authReducer
};
