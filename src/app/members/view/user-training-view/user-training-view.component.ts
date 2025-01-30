import { Component } from '@angular/core';
import { Training } from '../../../shared/models/training';
import { TrainingStore } from '../../../shared/stores/trainings.store';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { UserCardExerciseComponent } from '../../shared/user-card-exercise/user-card-exercise.component';
import { Exercise } from '../../../shared/models/exercise';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-user-training-view',
  standalone: true,
  imports: [HeaderComponent, UserCardExerciseComponent, CommonModule, ButtonComponent],
  templateUrl: './user-training-view.component.html',
  styleUrl: './user-training-view.component.scss'
})
export class UserTrainingViewComponent {
  training$: Observable<Training | undefined> = new Observable<Training>;

  completedExercises: Set<number> = new Set();

  constructor(
    private route: ActivatedRoute,
    private trainingStore: TrainingStore
  ) { }

  ngOnInit(): void {
    const trainingId = Number(this.route.snapshot.paramMap.get('id'));
    this.training$ = this.trainingStore.getTrainings().pipe(
      map((trainings: Training[]) => trainings.find((training: Training) => training.id === trainingId))
    );
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
    console.log('Treino concluído!');
  }
}
