import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import { 
  selectCompletedSeries, 
  selectCurrentSeries, 
  selectExerciseViewState 
} from '../../../../store/exercise-view/exercise-view.selectors';
import { map } from 'rxjs/operators';
import { Exercise } from '../../../models/exercise';
import * as ExerciseViewActions from '../../../../store/exercise-view/exercise-view.actions';

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
      map(series => series.includes(seriesIndex))
    );
  }

  areAllPreviousExercisesCompleted(currentExerciseId: number) {
    return this.exerciseViewState$.pipe(
      map(state => {
        const currentIndex = state.exercises.findIndex((ex: Exercise) => ex.id === currentExerciseId);
        
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

  completeSeries(exerciseId: number, seriesIndex: number) {
    this.store.dispatch(ExerciseViewActions.completeSeries({ exerciseId, seriesIndex }));
  }

  setCurrentSeries(exerciseId: number, seriesIndex: number) {
    this.store.dispatch(ExerciseViewActions.setCurrentSeries({ exerciseId, seriesIndex }));
  }
} 