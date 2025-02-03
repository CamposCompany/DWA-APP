import { createReducer, on } from '@ngrx/store';
import { TrainingActions } from './action-types';
import { Training } from '../../shared/models/training';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const trainingFeatureKey = 'training';

export interface TrainingState extends EntityState<Training> {
  allTrainingsLoaded: boolean;
  userTrainingsLoaded: boolean;
}

export const adapter: EntityAdapter<Training> = createEntityAdapter<Training>();

export const initialState: TrainingState = adapter.getInitialState({
  allTrainingsLoaded: false,
  userTrainingsLoaded: false
});

export const trainingReducer = createReducer(
  initialState,
  on(TrainingActions.allTrainingsLoaded, (state, action) => adapter.setAll(action.trainings, { ...state, allTrainingsLoaded: true })),
  on(TrainingActions.userTrainingsLoaded, (state, action) => adapter.setAll(action.trainings, { ...state, userTrainingsLoaded: true }))
);

export const {selectAll} = adapter.getSelectors();