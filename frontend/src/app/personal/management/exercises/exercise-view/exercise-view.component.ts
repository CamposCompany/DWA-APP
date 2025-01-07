import { Component, OnInit } from '@angular/core';
import { map, Observable, switchMap, take } from 'rxjs';
import { Exercise } from '../../../shared/models/exercise';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ExercisesStore } from '../../../shared/stores/exercises.store';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-exercise-view',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ButtonComponent,
    RouterModule,
    ReactiveFormsModule,
    InputComponent
  ],
  templateUrl: './exercise-view.component.html',
  styleUrls: ['./exercise-view.component.scss'],
})
export class ExerciseViewComponent implements OnInit {
  exercise$: Observable<Exercise | undefined> = new Observable<Exercise>();
  exerciseId!: number;
  hasNextExercise: boolean = false;
  isEditMode = false;
  exerciseForm!: FormGroup;
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private exercisesStore: ExercisesStore,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

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
        this.exercisesStore.getExerciseById(exerciseId)
      )
    );
  }

  private checkNextExercise(): void {
    this.exercisesStore.getExercises()
      .pipe(
        map((exercises) => exercises.some((exercise) => exercise.id === this.exerciseId + 1)),
      )
      .subscribe((exists) => {
        this.hasNextExercise = exists;
      });
  }

  private initForm(): void {
    this.exerciseForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      equipment: ['', Validators.required]
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.exercise$.pipe(take(1)).subscribe(exercise => {
        if (exercise) {
          this.exerciseForm.patchValue({
            name: exercise.name,
            description: exercise.description,
            category: exercise.category,
            equipment: exercise.equipment
          });
        }
      });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imageUrl = URL.createObjectURL(file);
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imageUrl = null;
  }

  saveExercise(): void {
    if (this.exerciseForm.valid) {
      const formData = new FormData();
      Object.keys(this.exerciseForm.value).forEach(key => {
        formData.append(key, this.exerciseForm.get(key)?.value);
      });

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.exercisesStore.updateExercise(this.exerciseId, formData).subscribe(() => {
        this.isEditMode = false;
      });
    }
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.selectedFile = null;
    this.imageUrl = null;
    this.initForm();
  }
}
