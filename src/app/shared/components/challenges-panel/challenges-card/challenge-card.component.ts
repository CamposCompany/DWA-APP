import { Component, Input } from '@angular/core';
import { Challenge } from '../../../models/challenge.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-challenge-card',
  standalone: true,
  templateUrl: './challenge-card.component.html',
  styleUrl: './challenge-card.component.scss',
  imports: [CommonModule],
})
export class ChallengeCardComponent {
  @Input() challenge!: Challenge;
}
