import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExerciseViewState } from './exercise-view.state';

export const selectExerciseViewState = createFeatureSelector<ExerciseViewState>('exerciseView');

export const selectCurrentExercise = createSelector(
  selectExerciseViewState,
  (state) => state.exercises[state.currentIndex]
);

export const selectHasNextExercise = createSelector(
  selectExerciseViewState,
  (state) => state.currentIndex < state.exercises.length - 1
);

export const selectHasPreviousExercise = createSelector(
  selectExerciseViewState,
  (state) => state.currentIndex > 0
);

export const selectIsTrainingView = createSelector(
  selectExerciseViewState,
  (state) => state.source === 'user-training'
);

export const selectCompletedSeries = createSelector(
  selectExerciseViewState,
  selectCurrentExercise,
  (state, exercise) => exercise ? state.completedSeries[exercise.id] || [] : []
);

export const selectCurrentSeries = createSelector(
  selectExerciseViewState,
  selectCurrentExercise,
  (state, exercise) => exercise ? state.currentSeries[exercise.id] || 0 : 0
); 