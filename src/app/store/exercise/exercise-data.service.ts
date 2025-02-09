import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Exercise, ExerciseData } from '../../shared/models/exercise';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExerciseDataService extends DefaultDataService<Exercise> {
    private readonly baseUrl = 'https://campos-portfolio.net/api/exercises?paginate=false';
  constructor(protected override http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Exercises', http, httpUrlGenerator);
  }

  override getAll(): Observable<Exercise[]> {
    return this.http.get<ExerciseData>(this.baseUrl).pipe(
      map((response: ExerciseData) => response.data.exercises)
    );
  }
} 