import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { Http } from '../services/http.service';
import { LoadingService } from '../services/loading.service';
import { Training, TrainingData, UserTrainingData } from '../models/training';
import { UsersStore } from './users.store';
import { User } from '../models/users';
import { selectUser } from '../../auth/login/store/auth.selectors';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class TrainingStore {
  private readonly routes = {
    trainings: 'trainings',
    userTraining: 'user-training/user',
    completeTraining: 'user-training'
  } as const;

  private trainingSubject = new BehaviorSubject<Training[]>([]);
  
  private readonly http = inject(Http);
  private readonly loadingService = inject(LoadingService);
  private readonly store = inject(Store<AppState>);

  trainings$: Observable<Training[]> = this.trainingSubject.asObservable();
  currentUser$: Observable<User> = this.store.select(selectUser);
  userId$: Observable<number> = this.currentUser$.pipe(map(user => user.id));
  userId: number = 0;

  constructor() {
    this.userId$.subscribe(id => this.userId = id);
  }

  public loadAllTrainings() {
    const loadTrainings$ = this.http
      .get<TrainingData>(`${this.routes.trainings}`)
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
      .get<UserTrainingData>(`${this.routes.userTraining}/${this.userId}`)
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
    return this.http.post(`${this.routes.completeTraining}/${trainingId}/complete`, {});
  }

  getTrainings(): Observable<Training[]> {
    return this.trainings$;
  }
}
