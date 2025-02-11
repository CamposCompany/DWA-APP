import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ChallengeEntityService } from '../../../store/challenge/challenge-entity.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-challenges-view',
  standalone: true,
  imports: [HeaderComponent, CommonModule, ButtonComponent],
  templateUrl: './challenges-view.component.html',
  styleUrl: './challenges-view.component.scss'
})
export class ChallengesViewComponent {
  private readonly challengeService = inject(ChallengeEntityService)

  challenges$ = this.challengeService.entities$;

  completeChallenge(challengeId: number) {
    console.log(challengeId);
  }
}
