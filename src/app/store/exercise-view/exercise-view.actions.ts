import { createAction, props } from '@ngrx/store';
import { Exercise, Repetition } from '../../shared/models/exercise';
import { Update } from '@ngrx/entity';

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

export const completeSeries = createAction(
  '[Exercise View] Complete Series',
  props<{ exerciseId: number; seriesIndex: number }>()
);

export const setCurrentSeries = createAction(
  '[Exercise View] Set Current Series',
  props<{ exerciseId: number; seriesIndex: number }>()
);

export const resetExerciseState = createAction('[Exercise View] Reset Exercise State');

export const updateRepetitionWeight = createAction(
  '[Exercise View] Update Repetition Weight',
  props<{ update: Update<Repetition> }>()
);
