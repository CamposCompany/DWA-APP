import { Injectable } from '@angular/core';
import { Training, TrainingData, UserTrainingData } from '../../shared/models/training';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingDataService extends DefaultDataService<Training> {
  private baseUrl = `${environment.api}trainings`;
  private userTrainingsUrl = `${environment.api}user-training/user`;

  private readonly routes = {
    userTraining: `${environment.api}user-training/user`,
    completeTraining: `${environment.api}user-training`
  } as const;

  constructor(protected override http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Trainings', http, httpUrlGenerator);
  }

  completeTraining(trainingId: number, duration: string): Observable<TrainingData> {
    return this.http.post<TrainingData>(`${this.routes.completeTraining}/${trainingId}/complete`, { duration });
  }

  override getAll(): Observable<Training[]> {
    return this.http.get<TrainingData>(this.baseUrl).pipe(
      map((response: TrainingData) => {
        return response.data.trainings
      })
    );
  }

  getUserTrainings(userId: number): Observable<Training[]> {
    return this.http.get<UserTrainingData>(`${this.userTrainingsUrl}/${userId}`).pipe(
      map((response: UserTrainingData) => response.data)
    );
  }
}
