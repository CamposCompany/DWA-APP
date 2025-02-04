import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ExerciseService } from '../../shared/services/exercise.service';
import { concatMap, map } from 'rxjs';
import { ExerciseActions } from './action-types';

@Injectable()
export class ExerciseEffects {
  private readonly exerciseService = inject(ExerciseService);
  private readonly actions$ = inject(Actions);

  loadExercises$ = createEffect(() => this.actions$.pipe(
    ofType(ExerciseActions.loadExercises),
    concatMap(action => 
      this.exerciseService.getAllExercises(action.paginate)
    ),
    map(exercises => ExerciseActions.allExercisesLoaded({ exercises }))
  ));
}
