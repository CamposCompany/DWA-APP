import { createAction, props } from '@ngrx/store';
import { Training } from '../../shared/models/training';

export const loadAllTrainings = createAction('[Trainings] Load All Trainings');

export const allTrainingsLoaded = createAction('[Trainings] All Trainings Loaded',
  props<{ trainings: Training[] }>()
);

export const loadUserTrainings = createAction('[Trainings] Load User Trainings');

export const userTrainingsLoaded = createAction('[Trainings] User Trainings Loaded',
  props<{ trainings: Training[] }>()
);
