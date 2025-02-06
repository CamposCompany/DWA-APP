import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingTimerService {
  private isTrainingStartedSubject = new BehaviorSubject<boolean>(false);
  private isPausedSubject = new BehaviorSubject<boolean>(false);
  private elapsedTimeSubject = new BehaviorSubject<string>('00:00:00');

  isTrainingStarted$ = this.isTrainingStartedSubject.asObservable();
  isPaused$ = this.isPausedSubject.asObservable();
  elapsedTime$ = this.elapsedTimeSubject.asObservable();

  private timerInterval: any;
  private startTime: number | null = null;
  private totalElapsedTime = 0;
  private lastUpdateTime: number | null = null;

  startTraining() {
    this.isTrainingStartedSubject.next(true);
    this.isPausedSubject.next(false);
    this.startTime = Date.now();
    this.lastUpdateTime = this.startTime;
    this.totalElapsedTime = 0;
    this.startTimer();
  }

  pauseTraining() {
    this.isPausedSubject.next(true);
    if (this.startTime && this.lastUpdateTime) {
      this.totalElapsedTime += this.lastUpdateTime - this.startTime;
    }
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }

  resumeTraining() {
    this.isPausedSubject.next(false);
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
    this.isTrainingStartedSubject.next(false);
    this.isPausedSubject.next(false);
    this.elapsedTimeSubject.next('00:00:00');
    this.startTime = null;
    this.totalElapsedTime = 0;
    this.lastUpdateTime = null;
  }

  resetTraining() {
    this.totalElapsedTime = 0;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.startTime = Date.now();
    this.startTimer();
    this.isPausedSubject.next(false);
  }
} 