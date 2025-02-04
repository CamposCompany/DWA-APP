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

export const selectUserExercises = createSelector(
    selectAllExercises,
    (exercises: Exercise[]) => exercises.filter(exercise => exercise.user_trainingID !== null)
);

export const selectTrainingExercises = (trainingId: number) => createSelector(
    selectAllExercises,
    (exercises: Exercise[]) => exercises.filter(exercise => exercise.pivot?.training_id === trainingId)
); 