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

  startTraining() {
    this.isTrainingStartedSubject.next(true);
    this.startTime = Date.now();
    this.totalElapsedTime = 0;
    this.startTimer();
  }

  pauseTraining() {
    const newPausedState = !this.isPausedSubject.value;
    this.isPausedSubject.next(newPausedState);
    
    if (newPausedState) {
      if (this.startTime) {
        this.totalElapsedTime += Date.now() - this.startTime;
      }
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    } else {
      this.startTime = Date.now();
      this.startTimer();
    }
  }

  private startTimer() {
    this.timerInterval = setInterval(() => {
      const currentElapsed = this.startTime ? (Date.now() - this.startTime) : 0;
      const totalMs = this.totalElapsedTime + currentElapsed;
      
      const hours = Math.floor(totalMs / 3600000);
      const minutes = Math.floor((totalMs % 3600000) / 60000);
      const seconds = Math.floor((totalMs % 60000) / 1000);
      
      this.elapsedTimeSubject.next(
        `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`
      );
    }, 1000);
  }

  private padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }

  stopTraining() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.isTrainingStartedSubject.next(false);
    this.isPausedSubject.next(false);
    this.elapsedTimeSubject.next('00:00:00');
    this.startTime = null;
    this.totalElapsedTime = 0;
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

  resumeTraining() {
    this.isTrainingStartedSubject.next(true);
    this.isPausedSubject.next(false);
    this.startTimer();
  }
} 