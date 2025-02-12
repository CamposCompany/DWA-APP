import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Training } from '../../shared/models/training.model';
import { TrainingViewDataService } from './training-view-data.service';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
    providedIn: 'root'
})
export class TrainingViewEntityService extends EntityCollectionServiceBase<Training> {
    trainingViewSubject = new BehaviorSubject<Training[]>([]);
    readonly trainingView$ = this.trainingViewSubject.asObservable();

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, private trainingViewDataService: TrainingViewDataService) {
        super('TrainingView', serviceElementsFactory);
    }

    getTrainingByUserId(userId: number): Observable<Training[]> {
        return this.trainingViewDataService.getTrainingByUserId(userId).pipe(
            map(userTrainings => {
                this.addAllToCache(userTrainings);
                this.trainingViewSubject.next(userTrainings);
                return userTrainings;
            })
        );
    }

    override getAll(): Observable<Training[]> {
        return this.trainingView$;
    }

    override upsertManyInCache(entities: Training[]): void {
        super.upsertManyInCache(entities);
        this.trainingViewSubject.next(entities);
    }
} 
