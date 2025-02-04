import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExerciseState } from './exercise.reducer';
import * as FromExercise from './exercise.reducer';
import { Exercise } from '../../shared/models/exercise';

export const selectExerciseState = createFeatureSelector<ExerciseState>('exercise');

export const selectAllExercises = createSelector(
    selectExerciseState,
    FromExercise.selectAll
);

export const selectExerciseById = (id: number) => createSelector(
    selectAllExercises,
    (exercises: Exercise[]) => exercises.find((exercise) => exercise.id === id)
);

export const allExercisesLoaded = createSelector(
    selectExerciseState,
    (state: ExerciseState) => state.allExercisesLoaded
); 