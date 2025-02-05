import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingStateService {
  private isTrainingStartedSubject = new BehaviorSubject<boolean>(false);
  private isTrainingPausedSubject = new BehaviorSubject<boolean>(false);
  
  isTrainingStarted$ = this.isTrainingStartedSubject.asObservable();
  isTrainingPaused$ = this.isTrainingPausedSubject.asObservable();

  startTraining() {
    this.isTrainingStartedSubject.next(true);
    this.isTrainingPausedSubject.next(false);
  }

  pauseTraining() {
    this.isTrainingPausedSubject.next(true);
  }

  resumeTraining() {
    this.isTrainingPausedSubject.next(false);
  }

  stopTraining() {
    this.isTrainingStartedSubject.next(false);
    this.isTrainingPausedSubject.next(false);
  }
} 