import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import {
  selectCompletedSeries,
  selectCurrentSeries,
  selectExerciseViewState,
  selectExerciseViewExercises
} from '../../../../store/exercise-view/exercise-view.selectors';

import { Exercise } from '../../../models/exercise';
import * as ExerciseViewActions from '../../../../store/exercise-view/exercise-view.actions';
import { map, combineLatest, take, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseViewService {
  private store = inject(Store<AppState>);

  private readonly completedSeries$ = this.store.select(selectCompletedSeries);
  private readonly currentSeries$ = this.store.select(selectCurrentSeries);
  private readonly exerciseViewState$ = this.store.select(selectExerciseViewState);

  getCompletedSeries() {
    return this.completedSeries$;
  }

  getCurrentSeries() {
    return this.currentSeries$;
  }

  isSeriesCompleted(seriesIndex: number) {
    return this.getCompletedSeries().pipe(
      take(1),
      map(series => series.includes(seriesIndex))
    );
  }

  areAllPreviousExercisesCompleted(currentExerciseId: number) {
    return this.exerciseViewState$.pipe(
      map(state => {
        let currentIndex = state.exercises.findIndex((ex: Exercise) => ex.id === currentExerciseId);

        if (currentExerciseId === -1) {
          currentIndex = state.exercises.length;
        }

        for (let i = 0; i < currentIndex; i++) {
          const exercise = state.exercises[i];
          const completedSeries = state.completedSeries[exercise.id] || [];
          for (let s = 0; s < exercise.series; s++) {
            if (!completedSeries.includes(s)) {
              return false;
            }
          }
        }
        return true;
      })
    );
  }

  areAllExercisesInTrainingCompleted(): Observable<boolean> {
    return this.exerciseViewState$.pipe(
      map(state => {
        if (!state.exercises || state.exercises.length === 0) {
          return false;
        }

        for (let i = 0; i < state.exercises.length; i++) {
          const exercise = state.exercises[i];
          const completedSeries = state.completedSeries[exercise.id] || [];
          if (completedSeries.length !== exercise.series) {
            return false;
          }
        }
        return true;
      })
    );
  }

  areAllSeriesCompleted(exerciseId: number): Observable<boolean> {
    return this.exerciseViewState$.pipe(
      map(state => {
        const exercise = state.exercises.find(ex => ex.id === exerciseId);
        if (!exercise) return false;

        const completedSeries = state.completedSeries[exerciseId] || [];
        return completedSeries.length === exercise.series;
      })
    );
  }

  completeSeries(exerciseId: number, seriesIndex: number) {
    this.store.dispatch(ExerciseViewActions.completeSeries({ exerciseId, seriesIndex }));

    return this.store.select(selectCompletedSeries).pipe(
      take(1),
      map(completedSeries => {
        const exerciseCompletedSeries = completedSeries[exerciseId] ?? [];
        return Array.isArray(exerciseCompletedSeries) && 
               exerciseCompletedSeries.includes(seriesIndex);
      })
    );
  }

  uncompleteSeries(exerciseId: number) {
    this.store.dispatch(ExerciseViewActions.uncompleteSeries({ exerciseId }));
  }

  completeAllSeries(exerciseId: number, totalSeries: number) {
    for (let i = 0; i < totalSeries; i++) {
      this.completeSeries(exerciseId, i);
    }
  }

  getCurrentExerciseState(): Observable<{ [exerciseId: number]: boolean }> {
    return this.exerciseViewState$.pipe(
      map(state => {
        const result: { [exerciseId: number]: boolean } = {};
        state.exercises.forEach(exercise => {
          const completedSeries = state.completedSeries[exercise.id] || [];
          result[exercise.id] = completedSeries.length === exercise.series;
        });
        return result;
      })
    );
  }

  setCurrentSeries(exerciseId: number, seriesIndex: number) {
    this.store.dispatch(ExerciseViewActions.setCurrentSeries({ exerciseId, seriesIndex }));
  }

  updateRepetitionWeight(exerciseId: number, weight: number, repetitionId: number) {
    this.store.dispatch(ExerciseViewActions.updateRepetitionWeight({
      exerciseId,
      weight,
      repetitionId
    }));
  }
} 
