import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CardExerciseComponent } from '../../components/card-exercise/card-exercise.component';
import { UserCardExerciseComponent } from '../../components/user-card-exercise/user-card-exercise.component';
import { AppState } from '../../../store';
import { selectTrainingById } from '../../../store/training/training.selectors';
import { HeaderComponent } from '../../components/header/header.component';
import { Training } from '../../models/training';
import { Exercise } from '../../models/exercise';

@Component({
  selector: 'app-training-view',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderComponent, 
    CardExerciseComponent,
    UserCardExerciseComponent
  ],
  templateUrl: './training-view.component.html',
  styleUrls: ['./training-view.component.scss'],
})
export class TrainingViewComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store<AppState>);

  training$: Observable<Training | undefined> = new Observable<Training>;

  ngOnInit(): void {
    const trainingId = Number(this.route.snapshot.paramMap.get('id'));
    this.training$ = this.store.select(selectTrainingById(trainingId));
  }

  hasUserTraining(exercises: Exercise[]): boolean {
    return exercises.some(exercise => exercise.user_trainingID !== null && exercise.user_trainingID !== undefined);
  }
}
