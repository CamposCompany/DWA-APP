import { Component, inject, OnInit } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Exercise } from '../../../../shared/models/exercise';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import { selectAllExercises, selectExerciseById } from '../../../../store/exercise/exercise.selectors';

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
export class ExerciseViewComponent implements OnInit {
  private readonly store = inject(Store<AppState>);
  private readonly route = inject(ActivatedRoute);

  exercise$: Observable<Exercise | undefined> = new Observable<Exercise>();
  exerciseId!: number;
  hasNextExercise: boolean = false;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id')))
    ).subscribe((id) => {
      this.exerciseId = id;
      this.checkNextExercise();
    });

    this.exercise$ = this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((exerciseId) =>
        this.store.select(selectExerciseById(exerciseId))
      )
    );
  }

  private checkNextExercise(): void {
    this.store.select(selectAllExercises)
      .pipe(
        map((exercises: Exercise[]) => exercises.some((exercise: Exercise) => exercise.id === this.exerciseId + 1)),
      )
      .subscribe((exists: boolean) => {
        this.hasNextExercise = exists;
      });
  }
}
