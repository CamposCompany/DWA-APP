import { Component, Input } from '@angular/core';
import { Challenge } from '../../../models/challenge.model';

@Component({
  selector: 'app-challenge-card',
  standalone: true,
  templateUrl: './challenge-card.component.html',
  styleUrl: './challenge-card.component.scss'
})
export class ChallengeCardComponent {
  @Input() challenge!: Challenge;
}
