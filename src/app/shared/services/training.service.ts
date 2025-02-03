import { inject, Injectable } from '@angular/core';
import { Http } from './http.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Training, TrainingData, UserTrainingData } from '../models/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private readonly http = inject(Http);
  private readonly userId: number = JSON.parse(localStorage.getItem('user') || '{}').id;

  private readonly routes = {
    trainings: 'trainings',
    userTraining: 'user-training/user',
    completeTraining: 'user-training'
  } as const;

  getAllTrainings(): Observable<Training[]> {
    return this.http.get<TrainingData>(this.routes.trainings).pipe(
      map(res => res.data.trainings),
      catchError((err) => {
        const message = 'Could not load trainings';
        alert(message);
        return throwError(() => err);
      })
    );
  }

  getUserTrainings(): Observable<Training[]> {
    return this.http.get<UserTrainingData>(`${this.routes.userTraining}/${this.userId}`).pipe(
      map(res => { console.log('res', res.data); return res.data }),
      catchError((err) => {
        const message = 'Could not load user trainings';
        alert(message);
        return throwError(() => err);
      })
    );
  }

  completeTraining(trainingId: number): Observable<any> {
    return this.http.post(`${this.routes.completeTraining}/${trainingId}/complete`, {});
  }
}
