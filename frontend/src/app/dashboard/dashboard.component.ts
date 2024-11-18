import { Component } from '@angular/core';
import { UsersStore } from '../shared/stores/users.store';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/models/users';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private currentUserSubject = new BehaviorSubject<User>({
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    document: '',
    telephone: '',
    gender: '',
    active: 0,
    roles: []
  })

  currentUser$: Observable<User> = this.currentUserSubject.asObservable();

  private usersSubject = new BehaviorSubject<User[]>([])

  users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor(private usersStore: UsersStore) {
    this.usersStore.loadCurrentUser();
    this.currentUser$ = this.usersStore.getCurrentUser();
    this.users$ = this.usersStore.getUsers();
    console.log(this.currentUser$);
  }
}
