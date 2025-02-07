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
        const currentIndex = state.exercises.findIndex((ex: Exercise) => ex.id === currentExerciseId);
        console.log(currentExerciseId, currentIndex);
        console.log(state);
        
        for (let i = 0; i < currentIndex; i++) {
          const exercise = state.exercises[i];
          console.log(exercise);
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

  completeSeries(exerciseId: number, seriesIndex: number) {
    this.store.dispatch(ExerciseViewActions.completeSeries({ exerciseId, seriesIndex }));
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

  areAllSeriesCompleted(exerciseId: number): Observable<boolean> {
    return combineLatest([
      this.store.select(selectExerciseViewState),
      this.store.select(selectExerciseViewExercises)
    ]).pipe(
      map(([state, exercises]) => {
        const exercise = exercises.find(ex => ex.id === exerciseId);
        if (!exercise) {
          return false;
        }

        const completedSeries = state.completedSeries[exerciseId] || [];
        return completedSeries.length === exercise.series;
      })
    );
  }

  uncompleteSeries(exerciseId: number) {
    this.store.dispatch(ExerciseViewActions.uncompleteSeries({ exerciseId }));
  }
} 
