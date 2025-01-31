import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { Http } from '../services/http.service';
import { LoadingService } from '../services/loading.service';
import { Training, TrainingData, UserTrainingData } from '../models/training';
import { UsersStore } from './users.store';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class TrainingStore {
  private route: string = 'trainings';
  private routeUserTraining: string = 'user-training/user';
  private trainingSubject = new BehaviorSubject<Training[]>([]);
  trainings$: Observable<Training[]> = this.trainingSubject.asObservable();

  currentUser$: Observable<User> = this.usersStore.currentUser$;
  userId$: Observable<number> = this.currentUser$.pipe(map(user => user.id));
  userId: number = 0;

  constructor(private http: Http, private loadingService: LoadingService, private usersStore: UsersStore) {
    this.userId$.subscribe(id => this.userId = id);
  }

  public loadAllTrainings() {
    const loadTrainings$ = this.http
      .get<TrainingData>(`${this.route}`)
      .pipe(
        catchError((err) => {
          const message = 'Could not load trainings';
          alert(message);
          return throwError(() => err);
        }),
        tap((res: TrainingData) => this.trainingSubject.next(res.data.trainings))
      );

    this.loadingService.showLoaderUntilCompleted(loadTrainings$).subscribe();
  }

  public loadUserTrainings() {
    const loadUserTrainings$ = this.http
      .get<UserTrainingData>(`${this.routeUserTraining}/${this.userId}`)
      .pipe(
        catchError((err) => {
          const message = 'Could not load user trainings';
          alert(message);
          return throwError(() => err);
        }),
        tap((res: UserTrainingData) => this.trainingSubject.next(res.data))
      );

    this.loadingService.showLoaderUntilCompleted(loadUserTrainings$).subscribe();
  }

  completeTraining(trainingId: number) {
    return this.http.post(`user-training/${trainingId}/complete`, {});
  }

  getTrainings(): Observable<Training[]> {
    return this.trainings$;
  }
}
