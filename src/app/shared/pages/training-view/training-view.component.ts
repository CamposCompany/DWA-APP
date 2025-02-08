import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { firstValueFrom, map, of, switchMap, combineLatest, Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { CardExerciseComponent } from '../../components/card-exercise/card-exercise.component';
import { UserCardExerciseComponent } from '../../components/user-card-exercise/user-card-exercise.component';
import { AppState } from '../../../store';
import { selectTrainingById } from '../../../store/training/training.selectors';
import { HeaderComponent } from '../../components/header/header.component';
import { Exercise } from '../../models/exercise';
import { ButtonComponent } from '../../components/button/button.component';
import Swal from 'sweetalert2';
import { TrainingTimerService } from './services/training-timer.service';
import { TrainingStateService } from './services/training-state.service';
import { ExerciseViewActions } from '../../../store/exercise-view/action.types';
import { ExerciseViewService } from '../exercise-view/services/exercise-view.service';
import { Training } from '../../models/training';
import { selectExerciseViewState } from '../../../store/exercise-view/exercise-view.selectors';


@Component({
  selector: 'app-training-view',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    CardExerciseComponent,
    UserCardExerciseComponent,
    ButtonComponent
  ],
  templateUrl: './training-view.component.html',
  styleUrls: ['./training-view.component.scss'],
})
export class TrainingViewComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(Store<AppState>);
  private readonly timerService = inject(TrainingTimerService);
  private readonly trainingStateService = inject(TrainingStateService);
  private readonly exerciseViewService = inject(ExerciseViewService);

  private readonly trainingBehaviorSubject = new BehaviorSubject<Training | null>(null);

  training$ = this.trainingBehaviorSubject.asObservable();

  isTrainingStarted$ = this.trainingStateService.isTrainingStarted$;
  isPaused$ = this.trainingStateService.isTrainingPaused$;
  elapsedTime$ = this.timerService.elapsedTime$;

  isTrainingCompleted$ = this.training$.pipe(
    map(training => training?.completed ?? false)
  );

  showTimer$ = combineLatest([
    this.isTrainingCompleted$,
    this.trainingStateService.isTrainingStarted$
  ]).pipe(
    map(([isCompleted, isStarted]) => !isCompleted && isStarted)
  );

  isOtherTrainingActive$ = this.training$.pipe(
    switchMap(training =>
      training ? combineLatest([
        this.trainingStateService.isTrainingStarted$,
        this.trainingStateService.activeTrainingId$
      ]).pipe(
        map(([isStarted, activeId]) =>
          isStarted && activeId !== null && activeId !== training.id
        )
      ) : of(false)
    )
  );

  ngOnInit(): void {
    const trainingId = Number(this.route.snapshot.paramMap.get('id'));
    this.store.select(selectTrainingById(trainingId)).subscribe(training => {
      if (training) {
        this.trainingBehaviorSubject.next(training);
      }
    });
  }

  hasUserTraining(exercises: Exercise[]): boolean {
    if (!exercises?.length) return false;
    return exercises.some(exercise => exercise.user_trainingID !== null && exercise.user_trainingID !== undefined);
  }

  isAllExercisesCompleted(): Observable<boolean> {
    const training = this.getTraining();
    if (!training?.exercises?.length) return of(false);
    
    return combineLatest(
      training.exercises.map(exercise => 
        this.exerciseViewService.areAllSeriesCompleted(exercise.id)
      )
    ).pipe(
      map(completedStates => completedStates.every(state => state))
    );
  }

  onExerciseCompleted(exercise: Exercise) {
    firstValueFrom(this.exerciseViewService.areAllSeriesCompleted(exercise.id)).then(isCompleted => {
      if (isCompleted) {
        this.exerciseViewService.uncompleteSeries(exercise.id);
      } else {
        for (let seriesIndex = 0; seriesIndex < exercise.series; seriesIndex++) {
          this.exerciseViewService.completeSeries(exercise.id, seriesIndex);
        }
      }
    });
  }

  isCompleted(exerciseId: number) {
    return this.exerciseViewService.areAllSeriesCompleted(exerciseId);
  }

  async onTrainingStart() {
    const training = await firstValueFrom(this.training$);
    if (!training) return;

    this.trainingStateService.startTraining(training.id);
    this.timerService.startTraining();
  }

  onTrainingPause() {
    this.trainingStateService.pauseTraining();
    this.timerService.pauseTraining();
  }

  onTrainingResume() {
    this.trainingStateService.resumeTraining();
    this.timerService.resumeTraining();
  }

  onTrainingRestart() {
    Swal.fire({
      title: 'Reiniciar treino?',
      text: 'Isso irá zerar o tempo e os exercícios completados',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, reiniciar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#f0ad4e',
      cancelButtonColor: '#6c757d'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const training = await firstValueFrom(this.training$);
        if (!training) return;

        training.exercises.forEach(exercise => {
          this.exerciseViewService.uncompleteSeries(exercise.id);
        });
        
        this.trainingStateService.resetTraining();
        this.timerService.stopTraining();
      }
    });
  }

  async onTrainingComplete() {
    const training = await firstValueFrom(this.training$);
    if (!training) return;

    this.store.dispatch(ExerciseViewActions.completeTraining({ trainingId: training.id }));
  }

  onExerciseClick(exercise: Exercise): void {
    this.store.dispatch(ExerciseViewActions.setExercises({
      exercises: this.trainingBehaviorSubject.value?.exercises ?? [],
      source: 'user-training',
      selectedExerciseId: exercise.id
    }));
    this.router.navigate(['/general/exercise-view']);
  }

  onTogglePause() {
    firstValueFrom(this.isPaused$).then(isPaused => {
      isPaused ? this.onTrainingResume() : this.onTrainingPause();
    });
  }

  getTraining(): Training {
    return this.trainingBehaviorSubject.value!;
  }
}
