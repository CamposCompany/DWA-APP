import { Component, OnInit } from '@angular/core';
import { UsersStore } from '../shared/stores/users.store';
import { map, Observable } from 'rxjs';
import { User } from '../shared/models/users';
import { CommonModule } from '@angular/common';

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

  dashboardInformation: any[] = [];

  constructor(private usersStore: UsersStore) {
    this.usersStore.loadCurrentUser();
    this.usersStore.loadAllUsers();

    this.currentUser$ = this.usersStore.getCurrentUser();
    this.users$ = this.usersStore.getUsers();


    this.userCount$ = this.users$.pipe(
      map(users => users.length)
    );

    console.log(this.users$);
  }

  ngOnInit(): void {
    this.setDashboardInformation();
  }

  public setDashboardInformation(): void {
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
}
