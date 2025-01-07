import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Training } from '../../../shared/models/training';
import { TrainingStore } from '../../../shared/stores/trainings.store';

import { CardExerciseComponent } from "../shared/components/card-exercise/card-exercise.component";
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-training-view',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CardExerciseComponent],
  templateUrl: './training-view.component.html',
  styleUrls: ['./training-view.component.scss'],
})
export class TrainingViewComponent implements OnInit {
  training$: Observable<Training | undefined> = new Observable<Training>;

  constructor(
    private route: ActivatedRoute,
    private trainingStore: TrainingStore
  ) { }

  ngOnInit(): void {
    const trainingId = Number(this.route.snapshot.paramMap.get('id'));
    this.training$ = this.trainingStore.getTrainings().pipe(
      map((trainings) => trainings.find((training) => training.id === trainingId))
    );
  }
}
