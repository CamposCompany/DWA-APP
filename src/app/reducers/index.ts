import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  State
} from '@ngrx/store';
import { loginReducer } from '../auth/login/reducers';

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  login: loginReducer
};
