import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CardExerciseComponent } from '../../components/card-exercise/card-exercise.component';
import { UserCardExerciseComponent } from '../../components/user-card-exercise/user-card-exercise.component';
import { AppState } from '../../../store';
import { selectTrainingById } from '../../../store/training/training.selectors';
import { HeaderComponent } from '../../components/header/header.component';
import { Training } from '../../models/training';
import { Exercise } from '../../models/exercise';
import * as ExerciseViewActions from '../../../store/exercise-view/exercise-view.actions';
import { ButtonComponent } from '../../components/button/button.component';
import { TrainingService } from '../../services/training.service';
import Swal from 'sweetalert2';

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

  training$: Observable<Training | undefined> = new Observable<Training | undefined>();
  completedExercises: Set<number> = new Set();

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

  onTrainingComplete() {
    this.training$.subscribe(training => {
      if (training) {
        this.trainingService.completeTraining(training.id).subscribe(() => {
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
    });
  }
}
