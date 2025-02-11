import { inject, Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Challenge } from '../../shared/models/challenge.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChallengeDataService } from './challenge-data.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeEntityService extends EntityCollectionServiceBase<Challenge> {
  private challengesSubject = new BehaviorSubject<Challenge[]>([]);
  private challengeDataService = inject(ChallengeDataService);

  readonly challenges$ = this.challengesSubject.asObservable();

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
  ) {
    super('Challenges', serviceElementsFactory);
  }

  override getAll(): Observable<Challenge[]> {
    super.getAll().subscribe(challenges => {
      this.challengesSubject.next(challenges);
    });

    return this.challenges$;
  }

  getChallengeById(id: number): Observable<Challenge | undefined> {
    return this.challenges$.pipe(
      map(challenges => challenges.find(challenge => challenge.id === id))
    );
  }

  getTodayChallenges(): Observable<Challenge[]> {
    this.challengeDataService.getTodayChallenges().subscribe(challenges => {
      this.challengesSubject.next(challenges);
      this.addAllToCache(challenges);
    });

    return this.challenges$;
  }
} 