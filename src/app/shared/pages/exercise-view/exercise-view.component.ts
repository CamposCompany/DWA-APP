import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { ButtonComponent } from '../../components/button/button.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import * as ExerciseViewActions from '../../../store/exercise-view/exercise-view.actions';
import {
  selectCurrentExercise,
  selectHasNextExercise,
  selectHasPreviousExercise,
  selectIsTrainingView,
} from '../../../store/exercise-view/exercise-view.selectors';
import { Exercise, Repetition } from '../../models/exercise';
import { firstValueFrom, map, Observable, combineLatest, switchMap, of } from 'rxjs';
import { ExerciseViewService } from './services/exercise-view.service';
import { RestTimerService } from '../training-view/services/rest-timer.service';
import { TrainingStateService } from '../training-view/services/training-state.service';

@Component({
  selector: 'app-exercise-view',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent,
    RouterModule,
    CommonModule
  ],
  templateUrl: './exercise-view.component.html',
  styleUrls: ['./exercise-view.component.scss'],
})
export class ExerciseViewComponent {
  private readonly store = inject(Store<AppState>);
  private readonly trainingStateService = inject(TrainingStateService);

  public readonly exerciseViewService = inject(ExerciseViewService);
  public readonly restTimer = inject(RestTimerService);

  exercise$ = this.store.select(selectCurrentExercise);
  hasNextExercise$ = this.store.select(selectHasNextExercise);
  hasPreviousExercise$ = this.store.select(selectHasPreviousExercise);
  isTrainingView$ = this.store.select(selectIsTrainingView);
  currentSeries$ = this.exerciseViewService.currentSeries$;
  isTrainingStarted$ = this.trainingStateService.isTrainingStarted$;

  hasMethodology(exercise: Exercise | null): boolean {
    return !!exercise?.methodology;
  }

  startRestTimer(seconds: number) {
    this.restTimer.startTimer(seconds);
  }

  async onCompleteSeries(seriesIndex: number) {
    const exercise = await firstValueFrom(this.exercise$);

    this.exerciseViewService.completeSeries(exercise.id, seriesIndex);
    this.startRestTimer(exercise.rest);

    if (seriesIndex === exercise.series - 1) {
      const isLastExercise = !(await firstValueFrom(this.hasNextExercise$));
      const allExercisesCompleted = await firstValueFrom(this.exerciseViewService.areAllExercisesCompleted());

      if (isLastExercise && allExercisesCompleted) {
        this.trainingStateService.completeTraining(exercise.user_trainingID!);
      } else {
        this.navigateToExercise('next');
      }
    } else {
      this.exerciseViewService.setCurrentSeries(exercise.id, seriesIndex + 1);
    }
  }

  isLastSeries(exercise: Exercise | null, seriesIndex: number): boolean {
    return seriesIndex === (exercise?.series || 0) - 1;
  }

  navigateToExercise(direction: 'next' | 'previous'): void {
    if (direction === 'next') {
      this.store.dispatch(ExerciseViewActions.nextExercise());
    } else {
      this.store.dispatch(ExerciseViewActions.previousExercise());
    }
  }

  createSeriesArray(series: number): number[] {
    return Array(series).fill(0).map((_, i) => i);
  }

  getRepetitionForSeries(repetitions: Repetition[], seriesIndex: number): number {
    if (!repetitions || repetitions.length === 0) return 0;

    if (repetitions.length === 1) {
      return repetitions[0].repetitions;
    }

    if (repetitions[seriesIndex]) {
      return repetitions[seriesIndex].repetitions;
    }

    return repetitions[repetitions.length - 1].repetitions;
  }

  isSeriesAvailable(currentIndex: number) {
    return this.exerciseViewService.completedSeries$.pipe(
      map(completedSeries => {
        for (let i = 0; i < currentIndex; i++) {
          if (!completedSeries.includes(i)) {
            return false;
          }
        }
        return true;
      })
    );
  }

  isButtonDisabled(seriesIndex: number): Observable<boolean> {
    return combineLatest([
      this.isTrainingStarted$,
      this.trainingStateService.isTrainingPaused$,
      this.exerciseViewService.isSeriesCompleted(seriesIndex),
      this.isSeriesAvailable(seriesIndex),
      this.exercise$.pipe(
        switchMap(exercise =>
          exercise ? this.exerciseViewService.areAllPreviousExercisesCompleted(exercise.id) : of(false)
        )
      )
    ]).pipe(
      map(([isStarted, isPaused, isCompleted, isAvailable, allPreviousCompleted]) =>
        !isStarted || isPaused || isCompleted || !isAvailable || !allPreviousCompleted
      )
    );
  }
}
