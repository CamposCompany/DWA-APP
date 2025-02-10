import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Training } from '../../shared/models/training';
import { map } from 'rxjs/operators';
import { TrainingDataService } from './training-data.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingEntityService extends EntityCollectionServiceBase<Training> {
  private trainingsSubject = new BehaviorSubject<Training[]>([]);
  readonly trainings$ = this.trainingsSubject.asObservable();

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, private trainingDataService: TrainingDataService) {
    super('Trainings', serviceElementsFactory);
  }

  getUserTrainings(userId: number): Observable<Training[]> {
    this.trainingDataService.getUserTrainings(userId).subscribe({
      next: (trainings) => {
        this.addAllToCache(trainings);
        this.trainingsSubject.next(trainings);
      },
      error: (error) => console.error('Error fetching trainings:', error)
    });

    return this.trainings$;
  }

  getTrainingById(id: number) {
    return this.trainings$.pipe(
      map(trainings => {
        return trainings.find(training => training.id === id);
      })
    );
  }

  completeTraining(trainingId: number, duration: string): Observable<Training | undefined> {
    this.trainingDataService.completeTraining(trainingId, duration).subscribe({
      next: (training) => console.log('Training completed:', training),
      error: (error) => console.error('Error completing training:', error)
    });

    return this.trainings$.pipe(
      map(trainings => trainings.find(t => t.id === trainingId))
    );
  }

  override getAll(): Observable<Training[]> {
    super.getAll().subscribe(trainings => {
      this.trainingsSubject.next(trainings);
    });
    
    return this.trainings$;
  }
}
