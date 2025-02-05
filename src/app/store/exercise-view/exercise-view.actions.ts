import { createAction, props } from '@ngrx/store';
import { Exercise } from '../../shared/models/exercise';

export const setExercises = createAction(
  '[Exercise View] Set Exercises',
  props<{ 
    exercises: Exercise[], 
    selectedExerciseId: number,
    source: 'training' | 'user-training' | 'all' 
  }>()
);

export const nextExercise = createAction('[Exercise View] Next Exercise');
export const previousExercise = createAction('[Exercise View] Previous Exercise');
export const resetExerciseView = createAction('[Exercise View] Reset');