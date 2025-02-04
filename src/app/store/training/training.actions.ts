import { createAction, props } from '@ngrx/store';
import { Training } from '../../shared/models/training';

export const loadTrainings = createAction(
  '[Trainings] Load Trainings',
  props<{ isAdmin: boolean }>()
);

export const allTrainingsLoaded = createAction(
  '[Trainings] Trainings Loaded',
  props<{ trainings: Training[] }>()
);

export const resetTrainingState = createAction(
  '[Trainings] Reset State'
);