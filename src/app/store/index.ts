import { ActionReducerMap } from '@ngrx/store';
import { ExerciseViewState } from './exercise-view/exercise-view.state';
import { exerciseViewReducer } from './exercise-view/exercise-view.reducer';

export interface AppState {
  exerciseView: ExerciseViewState;
}

export const reducers: ActionReducerMap<AppState> = {
  exerciseView: exerciseViewReducer
};
