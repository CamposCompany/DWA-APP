import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStore } from '../../../shared/stores/users.store';
import { User } from '../../../shared/models/users';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-gym-members',
  standalone: true,
  imports: [CommonModule, ButtonComponent, HeaderComponent],
  templateUrl: './gym-members.component.html',
  styleUrl: './gym-members.component.scss'
})
export class GymMembersComponent implements OnInit {
  members$: Observable<User[]>;

  constructor(private usersStore: UsersStore) {
    this.members$ = this.usersStore.getCostumers();
  }

  ngOnInit(): void {
    this.usersStore.loadAllUsers();
  }

  onViewTraining(memberId: number): void {
    console.log('Ver treino do membro:', memberId);
  }
}
