import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from '../auth/login/store';
import { trainingReducer } from './training/training.reducer';


export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  login: authReducer,
  training: trainingReducer
};
