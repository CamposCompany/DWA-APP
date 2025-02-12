import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Training, TrainingData, UserTrainingData } from '../../shared/models/training.model';
import { environment } from '../../environments/environment';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';


@Injectable({
    providedIn: 'root'
})
export class TrainingViewDataService extends DefaultDataService<Training> {
    private readonly routes = {
        trainingByUserId: `${environment.api}user-training/user`
    };

    constructor(protected override http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('TrainingView', http, httpUrlGenerator);
    }

    getTrainingByUserId(userId: number): Observable<Training[]> {
        return this.http.get<UserTrainingData>(`${this.routes.trainingByUserId}/${userId}`).pipe(
            map((response: UserTrainingData) => response.data)
        );
    }
} 