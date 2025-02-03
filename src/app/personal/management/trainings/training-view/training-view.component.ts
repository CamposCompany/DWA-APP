import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Training } from '../../../../shared/models/training';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import { selectTrainingById } from '../../../../store/training/training.selectors';

import { CardExerciseComponent } from "../../exercises/shared/components/card-exercise/card-exercise.component";
import { HeaderComponent } from '../../../../shared/components/header/header.component';

@Component({
  selector: 'app-training-view',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CardExerciseComponent],
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
}
