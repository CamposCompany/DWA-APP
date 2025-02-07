import { createReducer, on } from '@ngrx/store';
import * as ExerciseViewActions from './exercise-view.actions';
import { initialState } from './exercise-view.state';


export const exerciseViewReducer = createReducer(
  initialState,
  on(ExerciseViewActions.setExercises, (state, { exercises, selectedExerciseId, source }) => {
    const currentIndex = exercises.findIndex(ex => ex.id === selectedExerciseId);
    return {
      ...state,
      exercises,
      selectedExerciseId,
      source,
      currentIndex: currentIndex >= 0 ? currentIndex : 0
    };
  }),
  on(ExerciseViewActions.nextExercise, (state) => ({
    ...state,
    currentIndex: Math.min(state.currentIndex + 1, state.exercises.length - 1),
    selectedExerciseId: state.exercises[Math.min(state.currentIndex + 1, state.exercises.length - 1)]?.id || null
  })),
  on(ExerciseViewActions.previousExercise, (state) => ({
    ...state,
    currentIndex: Math.max(state.currentIndex - 1, 0),
    selectedExerciseId: state.exercises[Math.max(state.currentIndex - 1, 0)]?.id || null
  })),
  on(ExerciseViewActions.resetExerciseView, () => initialState),
  on(ExerciseViewActions.completeSeries, (state, { exerciseId, seriesIndex }) => ({
    ...state,
    completedSeries: {
      ...state.completedSeries,
      [exerciseId]: [...(state.completedSeries[exerciseId] || []), seriesIndex]
    }
  })),
  on(ExerciseViewActions.setCurrentSeries, (state, { exerciseId, seriesIndex }) => ({
    ...state,
    currentSeries: {
      ...state.currentSeries,
      [exerciseId]: seriesIndex
    }
  })),
  on(ExerciseViewActions.resetExerciseState, (state) => ({
    ...state,
    completedSeries: {},
    currentSeries: {}
  }))
); 