import { createReducer, on } from '@ngrx/store';
import { TrainingActions } from './action-types';
import { Training } from '../../shared/models/training';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { allTrainingsLoaded } from './training.actions';

export const trainingFeatureKey = 'training';

export interface TrainingState extends EntityState<Training> {
  allTrainingsLoaded: boolean;
}

export const adapter: EntityAdapter<Training> = createEntityAdapter<Training>();

export const initialState: TrainingState = adapter.getInitialState({
  allTrainingsLoaded: false
});

export const trainingReducer = createReducer(
  initialState,
  on(TrainingActions.loadTrainings, (state) => ({
    ...state,
    allTrainingsLoaded: false
  })),

  on(TrainingActions.allTrainingsLoaded, (state, action) =>
    adapter.setAll(action.trainings, {
      ...state,
      allTrainingsLoaded: true
    })
  ),

  on(TrainingActions.resetTrainingState, () => ({
    ...initialState,
    allTrainingsLoaded: false
  }))
);

export const { selectAll } = adapter.getSelectors();