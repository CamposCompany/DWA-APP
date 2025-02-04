import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { TrainingService } from '../../shared/services/training.service';
import { concatMap, map } from 'rxjs';
import { TrainingActions } from './action-types';


@Injectable()
export class TrainingEffects {
  private readonly trainingService = inject(TrainingService);
  private readonly actions$ = inject(Actions);

  loadTrainings$ = createEffect(() => this.actions$.pipe(
    ofType(TrainingActions.loadTrainings),
    concatMap(action => 
      action.isAdmin 
        ? this.trainingService.getAllTrainings()
        : this.trainingService.getUserTrainings()
    ),
    map(trainings => TrainingActions.allTrainingsLoaded({ trainings }))
  ));
}
