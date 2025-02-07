import { inject, Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Http } from './http.service';
import { Exercise, ExerciseData } from '../models/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private readonly route: string = 'exercises';
  private readonly routeUserTraining: string = 'user-training';
  private readonly http = inject(Http);

  getAllExercises(paginate: boolean = false): Observable<Exercise[]> {
    return this.http.get<ExerciseData>(`${this.route}?paginate=${paginate}`).pipe(
      map(res => res.data.exercises),
      catchError((err) => {
        const message = "Could not load exercises";
        alert(message);
        return throwError(() => err);
      })
    );
  }

  updateRepetitionWeight(exerciseId: number, weight: number, repetitionId: number) {
    return this.http.put<any, Exercise>(
      `${this.routeUserTraining}/${exerciseId}/repetition/${repetitionId}`, 
      { weight: weight.toString() }
    );
  }
}
