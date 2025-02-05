import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/index';
import * as ExerciseViewActions from '../../../../store/exercise-view/exercise-view.actions';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Exercise } from '../../../models/exercise';
import { selectAllExercises } from '../../../../store/exercise/exercise.selectors';
import { selectCompletedSeries, selectCurrentSeries } from '../../../../store/exercise-view/exercise-view.selectors';

@Injectable({
    providedIn: 'root'
})
export class ExerciseViewService {
    private store = inject(Store<AppState>);

    completedSeries$ = this.store.select(selectCompletedSeries);
    currentSeries$ = this.store.select(selectCurrentSeries);
    allExercises$ = this.store.select(selectAllExercises);

    isSeriesCompleted(seriesIndex: number) {
        return this.completedSeries$.pipe(
            map(series => series.includes(seriesIndex))
        );
    }

    areAllPreviousExercisesCompleted(currentExerciseId: number) {
        return combineLatest({
            exercises: this.allExercises$,
            completedSeries: this.completedSeries$
        }).pipe(
            map(({ exercises, completedSeries }) => {
                const currentIndex = exercises.findIndex((ex: Exercise) => ex.id === currentExerciseId);
                
                for (let i = 0; i < currentIndex; i++) {
                    const exercise = exercises[i];
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