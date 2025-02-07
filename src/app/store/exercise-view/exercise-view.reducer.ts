import { createReducer, on } from '@ngrx/store';
import * as ExerciseViewActions from './exercise-view.actions';
import { ExerciseViewState, initialState } from './exercise-view.state';
import { Exercise, Repetition } from '../../shared/models/exercise';
import { EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';

export const adapter: EntityAdapter<Exercise> = createEntityAdapter<Exercise>();
export const repetitionsAdapter: EntityAdapter<Repetition> = createEntityAdapter<Repetition>();

export const initialExerciseViewState: ExerciseViewState = adapter.getInitialState({
  exercises: [],
  currentIndex: 0,
  selectedExerciseId: null,
  source: 'all',
  completedSeries: {},
  currentSeries: {}
});

export const { selectAll } = adapter.getSelectors();

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
  })),

  on(ExerciseViewActions.updateRepetitionWeight, (state, { exerciseId, weight }) => ({
    ...state,
    exercises: state.exercises.map(exercise => {
      const repetition = exercise.repetitions.find(rep => rep.id === exerciseId);
      if (!repetition) return exercise;

      return {
        ...exercise,
        repetitions: exercise.repetitions.map(rep => 
          rep.id === exerciseId
            ? { ...rep, weight }
            : rep
        )
      };
    })
  })),

  on(ExerciseViewActions.uncompleteSeries, (state, { exerciseId }) => ({
    ...state,
    completedSeries: {
      ...state.completedSeries,
      [exerciseId]: []
    }
  }))
); 
