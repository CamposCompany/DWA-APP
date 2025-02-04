import { createAction, props } from '@ngrx/store';
import { Exercise } from '../../shared/models/exercise';

export const loadExercises = createAction(
  '[Exercises] Load Exercises',
  props<{ paginate: boolean }>()
);

export const allExercisesLoaded = createAction(
  '[Exercises] Exercises Loaded',
  props<{ exercises: Exercise[] }>()
);

export const resetExerciseState = createAction(
  '[Exercises] Reset State'
);