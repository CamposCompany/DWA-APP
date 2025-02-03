import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { User } from '../../shared/models/users';
import { Observable } from 'rxjs';
import { Training } from '../../shared/models/training';
import { CardComponent } from '../../shared/components/card/card.component';
import { selectUser } from '../../auth/login/store/auth.selectors';

import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { selectAllTrainings } from '../../store/training/training.selectors';

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
  userTrainings$: Observable<Training[]> = this.store.select(selectAllTrainings);

  formatDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
