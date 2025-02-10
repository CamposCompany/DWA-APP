import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { User } from '../../shared/models/users';
import { Observable } from 'rxjs';
import { Training } from '../../shared/models/training';
import { CardComponent } from '../../shared/components/card/card.component';
import { formatDuration } from '../../shared/utils/helpers/duration.helper';
import { TrainingEntityService } from '../../store/training/training-entity.service';
import { UserEntityService } from '../../store/user/user-entity.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly trainingEntityService = inject(TrainingEntityService);
  private readonly userEntityService = inject(UserEntityService);
  
  currentUser$: Observable<User> = this.userEntityService.currentUser$;
  userTrainings$: Observable<Training[]> = this.trainingEntityService.entities$;

  formatDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  formatDuration = formatDuration;
}
