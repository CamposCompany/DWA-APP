import { createAction, props } from '@ngrx/store';
import { Exercise, Repetition } from '../../shared/models/exercise';
import { Update } from '@ngrx/entity';

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

export const exerciseUpdated = createAction(
  '[Exercises] Exercise Updated',
  props<{ update: Update<Exercise> }>()
);