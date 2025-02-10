import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { User } from '../../shared/models/users';
import { Training } from '../../shared/models/training';
import { Exercise } from '../../shared/models/exercise';
import { KeymetricPanelComponent } from './components/keymetric-panel/keymetric-panel.component';
import { ActionsPanelComponent } from './components/actions-panel/actions-panel.component';
import { GymMembersPanelComponent } from './components/gym-members-panel/gym-members-panel.component';
import { TrainingsPanelComponent } from './components/trainings-panel/trainings-panel.component';
import { LoadingService } from '../../shared/services/loading.service';
import { RouterModule } from '@angular/router';
import { TrainingEntityService } from '../../store/training/training-entity.service';
import { ExerciseEntityService } from '../../store/exercise/exercise-entity.service';
import { UserEntityService } from '../../store/user/user-entity.service';
import { AuthEntityService } from '../../auth/store/auth-entity.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    KeymetricPanelComponent,
    ActionsPanelComponent,
    TrainingsPanelComponent,
    GymMembersPanelComponent,
    RouterModule
  ],
  providers: [LoadingService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly authEntityService = inject(AuthEntityService);
  private readonly trainingEntityService = inject(TrainingEntityService);
  private readonly exerciseEntityService = inject(ExerciseEntityService);
  private readonly userEntityService = inject(UserEntityService);

  trainings$: Observable<Training[]> = this.trainingEntityService.entities$;
  trainingCount$: Observable<number> = this.trainings$.pipe(
    map((trainings: Training[]) => trainings.length)
  );

  exercises$: Observable<Exercise[]> = this.exerciseEntityService.entities$;
  exerciseCount$: Observable<number> = this.exercises$.pipe(
    map((exercises: Exercise[]) => exercises.length)
  );

  users$: Observable<User[]> = this.userEntityService.entities$;
  gymMembers$: Observable<User[]> = this.userEntityService.getGymMembers();

  currentUser$: Observable<User> = this.userEntityService.currentUser$;
  userCount$: Observable<number> = this.users$.pipe(
    map((users: User[]) => users.length)
  );

}
