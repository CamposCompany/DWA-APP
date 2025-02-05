import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from '../auth/login/store';
import { trainingReducer, TrainingState } from './training/training.reducer';
import { exerciseReducer, ExerciseState } from './exercise/exercise.reducer';
import { userReducer, UserState } from './user/user.reducer';
import { ExerciseViewState } from './exercise-view/exercise-view.state';
import { exerciseViewReducer } from './exercise-view/exercise-view.reducer';

export interface AppState {
  login: AuthState;
  training: TrainingState;
  exercise: ExerciseState;
  user: UserState;
  exerciseView: ExerciseViewState;
}

export const reducers: ActionReducerMap<AppState> = {
  login: authReducer,
  training: trainingReducer,
  exercise: exerciseReducer,
  user: userReducer,
  exerciseView: exerciseViewReducer
};
