import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { User } from '../../shared/models/users';
import { Observable } from 'rxjs';
import { TrainingStore } from '../../shared/stores/trainings.store';
import { Training } from '../../shared/models/training';
import { CardComponent } from '../../shared/components/card/card.component';
import { selectUser } from '../../auth/login/store/auth.selectors';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly store = inject(Store<AppState>);

  currentUser$: Observable<User> = this.store.select(selectUser);
  userTrainings$: Observable<Training[]> = this.trainingStore.getTrainings();

  constructor(private trainingStore: TrainingStore) {
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
