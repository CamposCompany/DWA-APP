import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/index';
import * as ExerciseViewActions from '../../../../store/exercise-view/exercise-view.actions';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { selectCompletedSeries, selectCurrentSeries, selectExerciseViewExercises } from '../../../../store/exercise-view/exercise-view.selectors';
import { selectExerciseViewState } from '../../../../store/exercise-view/exercise-view.selectors';

@Injectable({
    providedIn: 'root'
})
export class ExerciseViewService {
    private store = inject(Store<AppState>);

    completedSeries$ = this.store.select(selectCompletedSeries);
    currentSeries$ = this.store.select(selectCurrentSeries);
    allExercises$ = this.store.select(selectExerciseViewExercises);

    isSeriesCompleted(seriesIndex: number) {
        return this.completedSeries$.pipe(
            map(series => series.includes(seriesIndex))
        );
    }

    areAllPreviousExercisesCompleted(currentExerciseId: number) {
        return combineLatest({
            exercises: this.store.select(selectExerciseViewExercises),
            completedSeries: this.store.select(selectExerciseViewState)
        }).pipe(
            map(({ exercises, completedSeries }) => {
                const currentIndex = exercises.findIndex(ex => ex.id === currentExerciseId);

                for (let i = 0; i < currentIndex; i++) {
                    const exercise = exercises[i];
                    const exerciseCompletedSeries = completedSeries.completedSeries[exercise.id] || [];

                    if (exerciseCompletedSeries.length !== exercise.series) {
                        return false;
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

    areAllExercisesCompleted() {
        return combineLatest({
            exercises: this.store.select(selectExerciseViewExercises),
            completedSeries: this.store.select(selectExerciseViewState)
        }).pipe(
            map(({ exercises, completedSeries }) => {
                for (const exercise of exercises) {
                    const exerciseCompletedSeries = completedSeries.completedSeries[exercise.id] || [];

                    if (exerciseCompletedSeries.length !== exercise.series) {
                        return false;
                    }
                }
                return true;
            })
        );
    }
} 