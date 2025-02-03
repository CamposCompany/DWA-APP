import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStore } from '../../../store/users.store';
import { User } from '../../../shared/models/users';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-gym-members',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
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
