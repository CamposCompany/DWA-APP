import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Http } from './http.service';
import { Exercise, ExerciseData, Repetition } from '../models/exercise';
import { LoadingService } from './loading.service';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private readonly route: string = 'exercises';

  constructor(
    private readonly http: Http,
  ) {}

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

  updateRepetitionWeight(update: Update<Repetition>) {
    return this.http.put<Update<Repetition>, Exercise>(`${this.route}/repetitions`, update);
  }
}
