import { Injectable } from '@angular/core';
import { Challenge } from '../../shared/models/challenge.model';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ChallengeData } from '../../shared/models/challenge.model';

@Injectable({
  providedIn: 'root'
})
export class ChallengeDataService extends DefaultDataService<Challenge> {
  private baseUrl = `${environment.api}challenges`;

  private readonly routes = {
    todayChallenges: `${environment.api}challenges/today`,
  } as const;

  constructor(protected override http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Challenges', http, httpUrlGenerator);
  }

  override getAll(): Observable<Challenge[]> {
    return this.http.get<ChallengeData>(this.routes.todayChallenges).pipe(
      map((response: ChallengeData) => response.data)
    );
  }
} 