import { Component, inject, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { ButtonComponent } from '../../components/button/button.component';
import { TrainingService } from '../../services/training.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import * as ExerciseViewActions from '../../../store/exercise-view/exercise-view.actions';
import { 
  selectCurrentExercise, 
  selectHasNextExercise, 
  selectHasPreviousExercise, 
  selectIsTrainingView 
} from '../../../store/exercise-view/exercise-view.selectors';
import { Exercise, Repetition } from '../../models/exercise';

@Component({
  selector: 'app-exercise-view',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent,
    RouterModule,
    CommonModule
  ],
  templateUrl: './exercise-view.component.html',
  styleUrls: ['./exercise-view.component.scss'],
})
export class ExerciseViewComponent implements OnDestroy {
  private readonly router = inject(Router);
  private readonly trainingService = inject(TrainingService);
  private readonly store = inject(Store<AppState>);

  exercise$ = this.store.select(selectCurrentExercise);
  hasNextExercise$ = this.store.select(selectHasNextExercise);
  hasPreviousExercise$ = this.store.select(selectHasPreviousExercise);
  isTrainingView$ = this.store.select(selectIsTrainingView);

  getUniqueRepetitions(repetitions: Repetition[]): number[] {
    return [...new Set(repetitions.map(rep => rep.repetitions))];
  }

  hasMethodology(exercise: Exercise): boolean {
    return exercise.methodology !== null && exercise.methodology !== '';
  }

  navigateToExercise(direction: 'next' | 'previous'): void {
    if (direction === 'next') {
      this.store.dispatch(ExerciseViewActions.nextExercise());
    } else {
      this.store.dispatch(ExerciseViewActions.previousExercise());
    }
  }

  onTrainingComplete(exercise: Exercise) {
    if (!exercise.user_trainingID) return;

    this.trainingService.completeTraining(exercise.user_trainingID).subscribe(() => {
      Swal.fire({
        title: 'Parabéns!',
        text: 'Você concluiu seu treino com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#4CAF50'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/members/home']);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(ExerciseViewActions.resetExerciseView());
  }
}
