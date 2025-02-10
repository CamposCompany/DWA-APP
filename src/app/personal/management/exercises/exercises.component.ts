import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FilterComponent } from '../../../shared/components/filter/filter.component';
import { map } from 'rxjs/operators';
import { Exercise } from '../../../shared/models/exercise';
import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';
import { CardExerciseComponent } from '../../../shared/components/card-exercise/card-exercise.component';
import { ExerciseViewActions } from '../../../store/exercise-view/action.types';
import { ExerciseEntityService } from '../../../store/exercise/exercise-entity.service';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [HeaderComponent, FilterComponent, CommonModule, CardExerciseComponent, RouterModule],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})

export class ExercisesComponent {
  private readonly store = inject(Store<AppState>);
  private readonly exerciseService = inject(ExerciseEntityService);
  private readonly router = inject(Router);

  exercises$ = this.exerciseService.entities$;
  filteredExercises$ = this.exercises$;

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
