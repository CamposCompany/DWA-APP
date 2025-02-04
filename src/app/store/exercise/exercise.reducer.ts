import { createReducer, on } from '@ngrx/store';
import { ExerciseActions } from './action-types';
import { Exercise } from '../../shared/models/exercise';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const exerciseFeatureKey = 'exercise';

export interface ExerciseState extends EntityState<Exercise> {
  allExercisesLoaded: boolean;
}

export const adapter: EntityAdapter<Exercise> = createEntityAdapter<Exercise>();

export const initialState: ExerciseState = adapter.getInitialState({
  allExercisesLoaded: false
});

export const exerciseReducer = createReducer(
  initialState,
  on(ExerciseActions.loadExercises, (state) => ({
    ...state,
    allExercisesLoaded: false
  })),
  on(ExerciseActions.allExercisesLoaded, (state, action) => 
    adapter.setAll(action.exercises, {
      ...state,
      allExercisesLoaded: true
    })
  ),
  on(ExerciseActions.resetExerciseState, () => initialState)
);

export const { selectAll } = adapter.getSelectors();

