import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, firstValueFrom, of, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TrainingService } from '../../../services/training.service';
import { TrainingTimerService } from './training-timer.service';
import { RestTimerService } from './rest-timer.service';
import { TrainingData } from '../../../models/training';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import { selectCurrentExercise } from '../../../../store/exercise-view/exercise-view.selectors';
import { selectTrainingById } from '../../../../store/training/training.selectors';

@Injectable({
  providedIn: 'root'
})
export class TrainingStateService {
  private readonly router = inject(Router);
  private readonly timerService = inject(TrainingTimerService);
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
        ? this.store.select(selectTrainingById(exercise.user_trainingID))
        : of(null)
    ),
    map(training => training?.completed ?? false)
  );;

  startTraining(trainingId: number) {
    this.activeTrainingIdSubject.next(trainingId);
    this.isTrainingStartedSubject.next(true);
    this.isTrainingPausedSubject.next(false);
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
