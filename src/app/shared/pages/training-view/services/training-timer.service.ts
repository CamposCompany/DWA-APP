import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Store } from '@ngrx/store';
import { ExerciseViewActions } from '../../../../store/exercise-view/action.types';

@Injectable({
  providedIn: 'root'
})
export class TrainingTimerService {
  private readonly store = inject(Store);
  private elapsedTimeSubject = new BehaviorSubject<string>('00:00:00');
  private isPausedSubject = new BehaviorSubject<boolean>(false);

  elapsedTime$ = this.elapsedTimeSubject.asObservable();

  private timerInterval: any;
  private startTime: number | null = null;
  private totalElapsedTime = 0;
  private lastUpdateTime: number | null = null;

  startTraining() {
    this.startTime = Date.now();
    this.lastUpdateTime = this.startTime;
    this.totalElapsedTime = 0;
    this.startTimer();
  }

  pauseTraining() {
    if (this.startTime && this.lastUpdateTime) {
      this.totalElapsedTime += this.lastUpdateTime - this.startTime;
    }
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }

  resumeTraining() {
    this.startTime = Date.now();
    this.lastUpdateTime = this.startTime;
    this.startTimer();
  }

  private startTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    
    this.timerInterval = setInterval(() => {
      if (!this.isPausedSubject.value && this.startTime) {
        const now = Date.now();
        const currentElapsed = now - this.startTime;
        this.lastUpdateTime = now;
        const totalMs = this.totalElapsedTime + currentElapsed;
        
        const hours = Math.floor(totalMs / 3600000);
        const minutes = Math.floor((totalMs % 3600000) / 60000);
        const seconds = Math.floor((totalMs % 60000) / 1000);
        
        this.elapsedTimeSubject.next(
          `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`
        );
      }
    }, 1000);
  }

  private padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }

  stopTraining() {
    this.clearTimer();
    this.resetState();
  }

  private clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private resetState() {
    this.isPausedSubject.next(false);
    this.elapsedTimeSubject.next('00:00:00');
    this.startTime = null;
    this.totalElapsedTime = 0;
    this.lastUpdateTime = null;
    
    this.store.dispatch(ExerciseViewActions.resetExerciseState());
  }

  getIsPaused() {
    return this.isPausedSubject.value;
  }

  getElapsedTime() {
    return this.elapsedTimeSubject.value;
  }
} 