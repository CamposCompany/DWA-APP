import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ExerciseService } from "../../shared/services/exercise.service";
import { ExerciseViewActions } from "./action.types";
import { concatMap, map } from "rxjs";

@Injectable()
export class ExerciseViewEffects {
  private readonly exerciseService = inject(ExerciseService);
  private readonly actions$ = inject(Actions);

  updateRepetitionWeight$ = createEffect(() => this.actions$.pipe(
    ofType(ExerciseViewActions.updateRepetitionWeight),
    concatMap(action =>
      this.exerciseService.updateRepetitionWeight(action.update)
    ),
    map(exercise => ExerciseViewActions.updateRepetitionWeight({ update: exercise }))
  ), { dispatch: false });
}