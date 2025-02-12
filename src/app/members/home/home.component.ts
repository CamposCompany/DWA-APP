import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { User } from '../../shared/models/users.model';
import { combineLatest, Observable, take } from 'rxjs';
import { Training } from '../../shared/models/training.model';
import { TrainingEntityService } from '../../store/training/training-entity.service';
import { UserEntityService } from '../../store/user/user-entity.service';
import { ChallengesPanelComponent } from '../../shared/components/challenges-panel/challenges-panel.component';
import { TrainingsPanelComponent } from '../../shared/components/trainings-panel/trainings-panel.component';
import { TrainingViewEntityService } from '../../store/training-view/training-view-entity.service';
import { HeaderComponent } from '../../shared/components/header/header.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TrainingsPanelComponent, ChallengesPanelComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly trainingEntityService = inject(TrainingEntityService);
  private readonly userEntityService = inject(UserEntityService);
  private readonly trainingViewEntityService = inject(TrainingViewEntityService);
  
  currentUser$: Observable<User> = this.userEntityService.currentUser$;
  userTrainings$: Observable<Training[]> = this.trainingEntityService.entities$;
  isAdmin: boolean = this.userEntityService.getIsAdmin();

  ngOnInit() {
    combineLatest([
      this.userTrainings$.pipe(take(1)),
      this.trainingViewEntityService.trainingView$.pipe(take(1))
    ]).subscribe(([trainings, trainingViews]) => {
      if (JSON.stringify(trainings) !== JSON.stringify(trainingViews)) {
        this.trainingViewEntityService.upsertManyInCache(trainings);
      }
    });  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
