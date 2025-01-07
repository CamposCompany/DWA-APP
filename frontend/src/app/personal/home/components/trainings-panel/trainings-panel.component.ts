import { Component, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Training } from '../../../../shared/models/training';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-trainings-panel',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterModule],
  templateUrl: './trainings-panel.component.html',
  styleUrl: './trainings-panel.component.scss'
})
export class TrainingsPanelComponent {
  @Input() trainings$: Observable<Training[]> = new Observable<Training[]>

  getDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours}h ${minutes}min`;
  }
}
