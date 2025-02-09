import { inject, Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Http } from './http.service';
import { Exercise, ExerciseData } from '../models/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private readonly routeUserTraining: string = 'user-training';
  private readonly http = inject(Http);

  updateRepetitionWeight(exerciseId: number, weight: number, repetitionId: number) {
    return this.http.put<any, Exercise>(
      `${this.routeUserTraining}/${exerciseId}/repetition/${repetitionId}`, 
      { weight: weight.toString() }
    );
  }
}
