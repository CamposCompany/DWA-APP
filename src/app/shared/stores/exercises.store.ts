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

  constructor(private http: Http, private loadingService: LoadingService, private router: Router) {
    this.loadAllExercises();
  }

  public loadAllExercises(paginate: boolean = false): void {
    const loadExercises$ = this.http.get<ExerciseData>(`${this.route}?paginate=${paginate}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      }),
    })
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

  addExercise(newExercise: FormData): void {
    let createdExerciseId: number = 0;

    const addExercise$ = this.http
      .post<FormData, any>(`${this.route}`, newExercise, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        }),
      })
      .pipe(
        catchError((err) => {
          alert('Error adding exercise');
          return throwError(() => err);
        }),
        tap((createdExerciseData) => {
          createdExerciseId = createdExerciseData.data.id;
          this.loadAllExercises();
        })
      );

    this.loadingService.showLoaderUntilCompleted(addExercise$).subscribe({
      next: () => {
        this.router.navigateByUrl(`exercises/${createdExerciseId}`);
      },
      error: (err) => {
        console.error('An error occurred:', err);
      },
    });
  }

  getExerciseById(id: number): Observable<Exercise> {
    return this.exercises$.pipe(
      map((exercises: Exercise[]) => exercises.find((exercise) => exercise.id === id)!)
    );
  }

  getExercises(): Observable<Exercise[]> {
    return this.exercises$;
  }

  updateExercise(id: number, exerciseData: FormData): Observable<any> {
    return this.http
      .post<FormData, any>(`${this.route}/${id}?_method=PUT`, exerciseData, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        }),
      })
      .pipe(
        catchError((err) => {
          alert('Error updating exercise');
          return throwError(() => err);
        }),
        tap(() => {
          this.loadAllExercises();
        })
      );
  }
}
