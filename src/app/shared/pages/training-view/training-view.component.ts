import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { firstValueFrom, map, of, switchMap, combineLatest } from 'rxjs';
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
  private readonly store = inject(Store<AppState>);
  private readonly timerService = inject(TrainingTimerService);
  private readonly trainingStateService = inject(TrainingStateService);

  training$ = this.store.select(selectTrainingById(Number(this.route.snapshot.paramMap.get('id'))));
  completedExercises: Set<number> = new Set();

  isTrainingStarted$ = this.timerService.getIsTrainingStarted();
  isPaused$ = this.timerService.getIsPaused();
  elapsedTime$ = this.timerService.getElapsedTime();

  isCurrentTrainingActive$ = this.training$.pipe(
    switchMap(training =>
      training ? this.trainingStateService.isActiveTraining(training.id) : of(false)
    )
  );

  showTimer$ = combineLatest([
    this.isCurrentTrainingActive$,
    this.timerService.getIsTrainingStarted()
  ]).pipe(
    map(([isActive, isStarted]) => isActive && isStarted)
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
    this.training$ = this.store.select(selectTrainingById(trainingId));
  }

  hasUserTraining(exercises: Exercise[]): boolean {
    return exercises.some(exercise => exercise.user_trainingID !== null && exercise.user_trainingID !== undefined);
  }

  isAllExercisesCompleted(exercises: Exercise[]): boolean {
    if (!exercises?.length) return false;
    return exercises.every(exercise => this.completedExercises.has(exercise.id));
  }

  onExerciseCompleted(exercise: Exercise) {
    if (this.completedExercises.has(exercise.id)) {
      this.completedExercises.delete(exercise.id);
    } else {
      this.completedExercises.add(exercise.id);
    }
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

        this.completedExercises.clear();
        this.timerService.stopTraining();
        this.trainingStateService.stopTraining();
      }
    });
  }

  async onTrainingComplete() {
    const training = await firstValueFrom(this.training$);
    if (!training) return;

    this.trainingStateService.completeTraining(training.id);
  }

  onTogglePause() {
    firstValueFrom(this.isPaused$).then(isPaused => {
      isPaused ? this.onTrainingResume() : this.onTrainingPause();
    });
  }
}
