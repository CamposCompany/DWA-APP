import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ExerciseService } from "../../shared/services/exercise.service";
import { ExerciseViewActions } from "./action.types";
import { concatMap, map, withLatestFrom, EMPTY, mergeMap } from "rxjs";
import { Store } from "@ngrx/store";
import { selectExerciseViewState } from "./exercise-view.selectors";
import { from } from "rxjs";
import { TrainingService } from "../../shared/services/training.service";
import { TrainingStateService } from "../../shared/pages/training-view/services/training-state.service";

@Injectable()
export class ExerciseViewEffects {
  private readonly exerciseService = inject(ExerciseService);
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly trainingService = inject(TrainingService);
  private readonly trainingStateService = inject(TrainingStateService);

  updateRepetitionWeight$ = createEffect(() => this.actions$.pipe(
    ofType(ExerciseViewActions.updateRepetitionWeight),
    withLatestFrom(this.store.select(selectExerciseViewState)),
    concatMap(([{ exerciseId, weight }, state]) => {
      const exercise = state.exercises.find(ex => ex.id === exerciseId);
      const repetitionId = exercise?.repetitions[state.currentSeries[exerciseId] || 0]?.id;

      if (!repetitionId) return EMPTY;

      return this.exerciseService.updateRepetitionWeight(repetitionId, weight, exerciseId).pipe(
        map(() => ExerciseViewActions.updateRepetitionWeightSuccess({
          exerciseId,
          weight,
          repetitionId
        }))
      );
    })
  ));

  completeTraining$ = createEffect(() => this.actions$.pipe(
    ofType(ExerciseViewActions.completeTraining),
    mergeMap(({ trainingId }) =>
      from(this.trainingService.completeTrainingWithFeedback(trainingId)).pipe(
        map(success => {
          if (success) {
            this.trainingStateService.completeTraining();
            return ExerciseViewActions.completeTrainingSuccess({ training: success.training! });
          }
          return ExerciseViewActions.completeTrainingFailure();
        })
      )
    )
  ));
}
