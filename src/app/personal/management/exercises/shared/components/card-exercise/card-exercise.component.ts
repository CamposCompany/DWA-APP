import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Exercise } from '../../../../../../shared/models/exercise';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-exercise',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-exercise.component.html',
  styleUrls: ['./card-exercise.component.scss'],
})
export class CardExerciseComponent {
  @Input() exercises: Exercise[] = [];
  @Input() exerciseAdded: Exercise[] = [];
  @Input() isInteractive: boolean = false
  @Input() showReps: boolean = false;
  @Output() exerciseClicked = new EventEmitter<number>();
  
  onExerciseClick(exerciseId: number): void {
    this.exerciseClicked.emit(exerciseId);
  }

  isExerciseAdded(exerciseId: number): boolean {
    return this.exerciseAdded.some((exercise) => exercise.id === exerciseId);
  }
}
