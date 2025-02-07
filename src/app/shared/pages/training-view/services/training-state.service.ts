import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TrainingService } from '../../../services/training.service';
import { TrainingTimerService } from './training-timer.service';
import { RestTimerService } from './rest-timer.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingStateService {
  private readonly router = inject(Router);
  private readonly trainingService = inject(TrainingService);
  private readonly timerService = inject(TrainingTimerService);
  private readonly restTimer = inject(RestTimerService);

  private isTrainingStartedSubject = new BehaviorSubject<boolean>(false);
  private isTrainingPausedSubject = new BehaviorSubject<boolean>(false);
  private activeTrainingIdSubject = new BehaviorSubject<number | null>(null);
  
  isTrainingStarted$ = this.isTrainingStartedSubject.asObservable();
  isTrainingPaused$ = this.isTrainingPausedSubject.asObservable();
  activeTrainingId$ = this.activeTrainingIdSubject.asObservable();

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

  stopTraining() {
    this.activeTrainingIdSubject.next(null);
    this.isTrainingStartedSubject.next(false);
    this.isTrainingPausedSubject.next(false);
  }

  async completeTraining(trainingId: number, onComplete?: () => void) {
    const confirmed = await this.trainingService.completeTrainingWithFeedback(trainingId);
    
    if (confirmed) {
        this.timerService.stopTraining();
        this.stopTraining();
        this.restTimer.stopTimer();
        onComplete?.();
        await this.router.navigate(['/members/home']);
    }
    
    return confirmed;
  }

  getIsTrainingStarted() {
    return this.isTrainingStartedSubject.value;
  }
} 