import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from '../../../shared/models/exercise';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Repetition } from '../../../shared/models/exercise';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-user-card-exercise',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './user-card-exercise.component.html',
  styleUrl: './user-card-exercise.component.scss'
})
export class UserCardExerciseComponent {
  @Input() exercises: Exercise[] = [];
  @Input() exerciseAdded: Exercise[] = [];
  @Input() isInteractive: boolean = false;
  @Input() showReps: boolean = false;
  @Output() exerciseClicked = new EventEmitter<number>();
  @Output() exerciseCompleted = new EventEmitter<Exercise>();
  @Output() trainingCompleted = new EventEmitter<void>();
  
  completedExercises: Set<number> = new Set();

  toggleExercise(exercise: Exercise, event: Event) {
    event.stopPropagation();
    
    if (this.completedExercises.has(exercise.id)) {
      this.completedExercises.delete(exercise.id);
    } else {
      this.completedExercises.add(exercise.id);
    }
    
    this.exerciseCompleted.emit(exercise);
  }

  isCompleted(exerciseId: number): boolean {
    return this.completedExercises.has(exerciseId);
  }

  ngOnInit() {
    const savedExercises = localStorage.getItem('completedExercises');
    if (savedExercises) {
      this.completedExercises = new Set(JSON.parse(savedExercises));
      
      this.exercises.forEach(exercise => {
        if (this.completedExercises.has(exercise.id)) {
          exercise.active = 1;
        }
      });
    }
  }

  onExerciseClick(exerciseId: number): void {
    this.exerciseClicked.emit(exerciseId);
  }

  isExerciseAdded(exerciseId: number): boolean {
    return this.exerciseAdded.some((exercise) => exercise.id === exerciseId);
  }

  formatRepetitions(repetitions: Repetition[]): string {
    if (!repetitions || repetitions.length === 0) return '0';

    const allEqual = repetitions.every(rep => rep.repetitions === repetitions[0].repetitions);
    
    if (allEqual) {
      return repetitions[0].repetitions.toString();
    }

    return repetitions.map(rep => rep.repetitions).join('/');
  }

  onExerciseCompleted(exercise: Exercise) {
    console.log('Exercício alterado:', exercise);
  }

  formatMethodology(methodology: string | null): string {
    if (!methodology) return '';
    
    const maxLength = 30;
    if (methodology.length <= maxLength) return methodology;
    
    return methodology.substring(0, maxLength) + '...';
  }

  isAllExercisesCompleted(): boolean {
    if (!this.exercises?.length) return false;
    return this.exercises.every(exercise => this.completedExercises.has(exercise.id));
  }

  onTrainingComplete() {
    this.trainingCompleted.emit();
  }
}
