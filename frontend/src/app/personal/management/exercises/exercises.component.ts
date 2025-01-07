import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FilterComponent } from '../../../shared/components/filter/filter.component';
import { map, Observable } from 'rxjs';
import { Exercise } from '../../../shared/models/exercise';
import { ExercisesStore } from '../../../shared/stores/exercises.store';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';
import { CardExerciseComponent } from '../trainings/shared/components/card-exercise/card-exercise.component';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [HeaderComponent, FilterComponent, ButtonComponent, CommonModule, CardExerciseComponent, RouterModule],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent {
  exercises$: Observable<Exercise[]>;
  filteredExercises$: Observable<Exercise[]>;

  constructor(private exercisesStore: ExercisesStore, private router: Router) {
    this.exercises$ = this.exercisesStore.getExercises();
    this.filteredExercises$ = this.exercises$;
  }

  onFilterChanged(filterText: string): void {
    this.filteredExercises$ = this.exercises$.pipe(
      map((exercises: Exercise[]) =>
        exercises.filter((exercise: Exercise) =>
          exercise.name.toLowerCase().includes(filterText.toLowerCase())
        )
      )
    );
  }

  viewExercise(event: number) {
    this.router.navigateByUrl(`exercises/${event}`);
  }


  newExercise() {
    this.router.navigateByUrl(`exercises/new-exercise`);
  }
}
