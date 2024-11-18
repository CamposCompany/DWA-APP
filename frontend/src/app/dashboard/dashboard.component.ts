import { Component, OnInit } from '@angular/core';
import { UsersStore } from '../shared/stores/users.store';
import { map, Observable, take } from 'rxjs';
import { User } from '../shared/models/users';
import { CommonModule } from '@angular/common';
import { dashboardInformation } from '../shared/models/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<User>;
  users$: Observable<User[]>;
  userCount$: Observable<number>;

  dashboardInformation: dashboardInformation[] = [];
  dashboardActions: any[] = [];

  constructor(private usersStore: UsersStore) {
    this.checkAndLoadCurrentUser();
    this.checkAndLoadAllUsers();

    this.currentUser$ = this.usersStore.getCurrentUser();
    this.users$ = this.usersStore.getUsers();

    this.userCount$ = this.users$.pipe(
      map((users: User[]) => users.length)
    );
  }

  ngOnInit(): void {
    this.setDashboardInformation();
    this.setDashboardAction();
  }

  private checkAndLoadCurrentUser(): void {
    this.usersStore.getCurrentUser()
      .pipe(take(1))
      .subscribe((currentUser: User) => {
        if (!currentUser || currentUser.id === 0) {
          this.usersStore.loadCurrentUser();
        }
      });
  }

  private checkAndLoadAllUsers(): void {
    this.usersStore.getUsers()
      .pipe(take(1))
      .subscribe((users: User[]) => {
        if (!users || users.length === 0) {
          this.usersStore.loadAllUsers();
        }
      });
  }

  private setDashboardInformation(): void {
    this.dashboardInformation = [{
      icon: 'assets/icons/shoes.svg',
      title: 'Total de alunos',
      value$: this.userCount$
    },
    {
      icon: 'assets/icons/verified-list.svg',
      title: 'Exercícios cadastrados',
      value$: this.userCount$
    },
    {
      icon: 'assets/icons/verified-list.svg',
      title: 'Treinos cadastrados',
      value$: this.userCount$
    }]
  }

  private setDashboardAction(): void {
    this.dashboardActions = [{
      icon: 'assets/icons/shoes.svg',
      title: 'Meus Alunos',
    },
    {
      icon: 'assets/icons/verified-list.svg',
      title: 'Treinos',
    },
    {
      icon: 'assets/icons/verified-list.svg',
      title: 'Novo Treino',
    }]
  }
}
