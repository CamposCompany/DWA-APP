import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Challenge } from '../../shared/models/challenge.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChallengeEntityService extends EntityCollectionServiceBase<Challenge> {
  private challengesSubject = new BehaviorSubject<Challenge[]>([]);
  readonly challenges$ = this.challengesSubject.asObservable();

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
  ) {
    super('Challenges', serviceElementsFactory);
  }

  getChallengeById(id: number): Observable<Challenge | undefined> {
    return this.challenges$.pipe(
      map(challenges => challenges.find(challenge => challenge.id === id))
    );
  }

  override getAll(): Observable<Challenge[]> {
    super.getAll().subscribe(challenges => {
      this.challengesSubject.next(challenges);
    });
    
    return this.challenges$;
  }
} 