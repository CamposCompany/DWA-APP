import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { UsersStore } from '../../shared/stores/users.store';
import { User } from '../../shared/models/users';
import { Observable } from 'rxjs';
import { TrainingStore } from '../../shared/stores/trainings.store';
import { Training } from '../../shared/models/training';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  currentUser$: Observable<User> = this.usersStore.currentUser$;
  userTrainings$: Observable<Training[]> = this.trainingStore.getTrainings();

  constructor(private usersStore: UsersStore, private trainingStore: TrainingStore) { }
}
