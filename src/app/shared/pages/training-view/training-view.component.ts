import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { first, firstValueFrom, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CardExerciseComponent } from '../../components/card-exercise/card-exercise.component';
import { UserCardExerciseComponent } from '../../components/user-card-exercise/user-card-exercise.component';
import { AppState } from '../../../store';
import { selectTrainingById } from '../../../store/training/training.selectors';
import { HeaderComponent } from '../../components/header/header.component';
import { Training } from '../../models/training';
import { Exercise } from '../../models/exercise';
import { ButtonComponent } from '../../components/button/button.component';
import { TrainingService } from '../../services/training.service';
import Swal from 'sweetalert2';
import { TrainingTimerService } from './services/training-timer.service';
import { TrainingStateService } from './services/training-state.service';

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
  private readonly router = inject(Router);
  private readonly trainingService = inject(TrainingService);
  private readonly timerService = inject(TrainingTimerService);
  private readonly trainingStateService = inject(TrainingStateService);

  training$: Observable<Training | undefined> = new Observable<Training | undefined>();
  completedExercises: Set<number> = new Set();
  
  isTrainingStarted$ = this.timerService.isTrainingStarted$;
  isPaused$ = this.timerService.isPaused$;
  elapsedTime$ = this.timerService.elapsedTime$;

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

  onTrainingStart() {
    this.trainingStateService.startTraining();
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
    }).then((result) => {
      if (result.isConfirmed) {
        this.completedExercises.clear();
        this.timerService.resetTraining();
        this.trainingStateService.stopTraining();
      }
    });
  }

  async onTrainingComplete() {
    const training = await firstValueFrom(this.training$);
    if (!training) return;

    const finalTime = await firstValueFrom(this.elapsedTime$);
    
    this.timerService.stopTraining();
    this.trainingStateService.stopTraining();
    const confirmed = await this.trainingService.completeTrainingWithFeedback(training.id);
    
    if (confirmed) {
      await this.router.navigate(['/members/home']);
    }
  }

  onTogglePause() {
    firstValueFrom(this.isPaused$).then(isPaused => {
      isPaused ? this.onTrainingResume() : this.onTrainingPause();
    });
  }
}
