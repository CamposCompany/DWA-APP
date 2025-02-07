import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Exercise, Repetition } from '../../models/exercise';
import { Router, RouterModule } from '@angular/router';
import { ExerciseViewActions } from '../../../store/exercise-view/action.types';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-card-exercise',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-exercise.component.html',
  styleUrls: ['./card-exercise.component.scss'],
})
export class CardExerciseComponent implements OnInit {
  @Input() exercises: Exercise[] = [];
  @Output() exerciseClick = new EventEmitter<Exercise>();

  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);

  ngOnInit(): void {
    console.log(this.exercises);
  }

  viewExercise(exercise: Exercise): void {
    this.store.dispatch(ExerciseViewActions.setExercises({
      exercises: this.exercises,
      source: 'training',
      selectedExerciseId: exercise.id
    }));
    this.router.navigate(['/general/exercise-view']);
  }
}
