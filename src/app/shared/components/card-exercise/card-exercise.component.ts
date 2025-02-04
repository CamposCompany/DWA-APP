import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Exercise, Repetition } from '../../models/exercise';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-card-exercise',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-exercise.component.html',
  styleUrls: ['./card-exercise.component.scss'],
})
export class CardExerciseComponent {
  @Input() exercises: Exercise[] = [];
  
  getUniqueRepetitions(repetitions: Repetition[]): number[] {
    return [...new Set(repetitions.map(rep => rep.repetitions))];
  }
}
