import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { User } from '../../../shared/models/users.model';
import { Observable } from 'rxjs';
import { UserEntityService } from '../../../store/user/user-entity.service';

@Component({
  selector: 'app-gym-members',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './gym-members.component.html',
  styleUrl: './gym-members.component.scss'
})
export class GymMembersComponent {
  readonly userEntityService = inject(UserEntityService);

  members$: Observable<User[]> = this.userEntityService.entities$;

  onViewTraining(memberId: number): void {
    console.log('Ver treino do membro:', memberId);
  }
}
