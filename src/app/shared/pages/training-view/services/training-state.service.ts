import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TrainingTimerService } from './training-timer.service';
import { RestTimerService } from './rest-timer.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import { selectCurrentExercise } from '../../../../store/exercise-view/exercise-view.selectors';
import { ExerciseViewActions } from '../../../../store/exercise-view/action.types';
import { TrainingEntityService } from '../../../../store/training/training-entity.service';


@Injectable({
  providedIn: 'root'
})
export class TrainingStateService {
  private readonly router = inject(Router);
  private readonly timerService = inject(TrainingTimerService);
  private readonly trainingEntityService = inject(TrainingEntityService);
  private readonly restTimer = inject(RestTimerService);
  private readonly store = inject(Store<AppState>);

  private isTrainingStartedSubject = new BehaviorSubject<boolean>(false);
  private isTrainingPausedSubject = new BehaviorSubject<boolean>(false);
  private activeTrainingIdSubject = new BehaviorSubject<number | null>(null);


  isTrainingStarted$ = this.isTrainingStartedSubject.asObservable();
  isTrainingPaused$ = this.isTrainingPausedSubject.asObservable();
  activeTrainingId$ = this.activeTrainingIdSubject.asObservable();
  isTrainingCompleted$ = this.store.select(selectCurrentExercise).pipe(
    switchMap(exercise =>
      exercise?.user_trainingID
        ? this.trainingEntityService.getTrainingById(exercise.user_trainingID)
        : of(null)
    ),
    map(training => training?.completed ?? false)
  );;

  startTraining(trainingId: number) {
    this.activeTrainingIdSubject.next(trainingId);
    this.isTrainingStartedSubject.next(true);
  }

  isActiveTraining(trainingId: number) {
    return this.activeTrainingId$.pipe(
      map(activeId => activeId === trainingId)
    );
  }

  pauseTraining() {
    this.isTrainingPausedSubject.next(true);
  }

  resumeTraining() {
    this.isTrainingPausedSubject.next(false);
  }

  completeTraining() {
    this.timerService.stopTraining();
    this.isTrainingStartedSubject.next(false);
    this.restTimer.stopTimer();
    this.router.navigate(['/members/home']);
  }

  resetTraining() {
    this.isTrainingStartedSubject.next(false);
    this.isTrainingPausedSubject.next(false);
    this.activeTrainingIdSubject.next(null);
    this.store.dispatch(ExerciseViewActions.resetExerciseState());
  }

  getIsTrainingStarted() {
    return this.isTrainingStartedSubject.value;
  }

  getIsTrainingPaused() {
    return this.isTrainingPausedSubject.value;
  }

  getActiveTrainingId() {
    return this.activeTrainingIdSubject.value;
  }
}
