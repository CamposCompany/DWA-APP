import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrainingState } from './training.reducer';

import * as FromTraining from './training.reducer';
import { Training } from '../../shared/models/training';

export const selectTrainingState = createFeatureSelector<TrainingState>('training');

export const selectAllTrainings = createSelector(
    selectTrainingState,
    FromTraining.selectAll
);

export const selectTrainingCount = createSelector(
    selectAllTrainings,
    (trainings: Training[]) => trainings.length > 3 ? trainings.slice(0, 3) : trainings
);

export const selectTrainingById = (id: number) => createSelector(
    selectAllTrainings,
    (trainings: Training[]) => trainings.find((training) => training.id === id)
);

export const allTrainingsLoaded = createSelector(
    selectTrainingState,
    (state: TrainingState) => state.allTrainingsLoaded
);