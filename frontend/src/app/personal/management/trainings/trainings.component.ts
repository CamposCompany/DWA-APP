import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TrainingStore } from '../../../shared/stores/trainings.store';
import { map, Observable } from 'rxjs';
import { Training } from '../../../shared/models/training';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilterComponent } from '../../../shared/components/filter/filter.component';

@Component({
  selector: 'app-trainings',
  standalone: true,
  imports: [HeaderComponent, ButtonComponent, CommonModule, RouterModule, FilterComponent],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss'
})
export class TrainingsComponent {
  trainings$: Observable<Training[]> = this.trainingsStore.getTrainings();
  filteredTrainings$: Observable<Training[]> = new Observable<Training[]>;


  constructor(private trainingsStore: TrainingStore) {
    this.filteredTrainings$ = this.trainings$;
  }

  onFilterChanged(filterText: string): void {
    this.filteredTrainings$ = this.trainings$.pipe(
      map((trainings: Training[]) =>
        trainings.filter((training: Training) =>
          training.name.toLowerCase().includes(filterText.toLowerCase())
        )
      )
    );
  }

}
