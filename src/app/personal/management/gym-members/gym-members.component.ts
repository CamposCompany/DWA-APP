import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { User } from '../../../shared/models/users';
import { Observable } from 'rxjs';
import { selectAllUsers } from '../../../store/user/user.selectors';

@Component({
  selector: 'app-gym-members',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './gym-members.component.html',
  styleUrl: './gym-members.component.scss'
})
export class GymMembersComponent {
  readonly store = inject(Store<AppState>);

  members$: Observable<User[]> = this.store.select(selectAllUsers);

  onViewTraining(memberId: number): void {
    console.log('Ver treino do membro:', memberId);
  }
}
