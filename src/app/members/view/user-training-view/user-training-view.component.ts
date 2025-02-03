import { Component, inject } from '@angular/core';
import { Training } from '../../../shared/models/training';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { selectTrainingById } from '../../../store/training/training.selectors';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { UserCardExerciseComponent } from '../../shared/user-card-exercise/user-card-exercise.component';
import { Exercise } from '../../../shared/models/exercise';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import Swal from 'sweetalert2';
import { TrainingService } from '../../../shared/services/training.service';

@Component({
  selector: 'app-user-training-view',
  standalone: true,
  imports: [HeaderComponent, UserCardExerciseComponent, CommonModule, ButtonComponent],
  templateUrl: './user-training-view.component.html',
  styleUrl: './user-training-view.component.scss'
})
export class UserTrainingViewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly trainingService = inject(TrainingService);
  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);

  training$: Observable<Training | undefined> = new Observable<Training>;

  completedExercises: Set<number> = new Set();
  ngOnInit(): void {
    const trainingId = Number(this.route.snapshot.paramMap.get('id'));
    this.training$ = this.store.select(selectTrainingById(trainingId));
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
