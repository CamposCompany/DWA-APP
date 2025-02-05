import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FilterComponent } from '../../../shared/components/filter/filter.component';
import { async, map, Observable } from 'rxjs';
import { Exercise } from '../../../shared/models/exercise';
import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';
import { CardExerciseComponent } from '../../../shared/components/card-exercise/card-exercise.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { selectAllExercises } from '../../../store/exercise/exercise.selectors';
import { ExerciseViewActions } from '../../../store/exercise-view/action.types';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [HeaderComponent, FilterComponent, CommonModule, CardExerciseComponent, RouterModule],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})

export class ExercisesComponent {
  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);

  exercises$: Observable<Exercise[]> = this.store.select(selectAllExercises);
  filteredExercises$: Observable<Exercise[]> = this.exercises$;

  onFilterChanged(filterText: string): void {
    this.filteredExercises$ = this.exercises$.pipe(
      map((exercises: Exercise[]) =>
        exercises.filter((exercise: Exercise) =>
          exercise.name.toLowerCase().includes(filterText.toLowerCase())
        )
      )
    );
  }

  viewExercises(exercise: Exercise): void {
    this.filteredExercises$.subscribe(exercises => {
      this.store.dispatch(ExerciseViewActions.setExercises({
        exercises,
        selectedExerciseId: exercise.id,
        source: 'all'
      }));
      this.router.navigate(['/general/exercise-view']);
    });
  }
}
