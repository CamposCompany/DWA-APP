import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { Http } from '../services/http.service';
import { HttpHeaders } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { Exercise, ExerciseData } from '../models/exercise';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExercisesStore {
  private route: string = 'exercises';
  private exerciseSubject = new BehaviorSubject<Exercise[]>([]);


  exercises$: Observable<Exercise[]> = this.exerciseSubject.asObservable();

  constructor(private http: Http, private loadingService: LoadingService) {}

  public loadAllExercises(paginate: boolean = false): void {
    const loadExercises$ = this.http.get<ExerciseData>(`${this.route}?paginate=${paginate}`)
      .pipe(
        catchError((err) => {
          const message = "Could not load exercises";
          alert(message);
          return throwError(() => err);
        }),
        tap((res: ExerciseData) => this.exerciseSubject.next(res.data.exercises))
      );

    this.loadingService.showLoaderUntilCompleted(loadExercises$).subscribe();
  }

  getExerciseById(id: number): Observable<Exercise> {
    return this.exercises$.pipe(
      map((exercises: Exercise[]) => exercises.find((exercise) => exercise.id === id)!)
    );
  }

  getExercises(): Observable<Exercise[]> {
    return this.exercises$;
  }
}
