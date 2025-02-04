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
import { Store } from '@ngrx/store';
import { selectUser } from '../../auth/login/store/auth.selectors';
import { AppState } from '../../store';
import { selectAllTrainings, selectTrainingCount } from '../../store/training/training.selectors';
import { selectAllExercises } from '../../store/exercise/exercise.selectors';
import { selectAllUsers, selectGymMembers } from '../../store/user/user.selectors';

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
  private readonly store = inject(Store<AppState>);

  trainings$: Observable<Training[]> = this.store.select(selectAllTrainings);
  trainingLimited$ = this.store.select(selectTrainingCount);
  trainingCount$: Observable<number> = this.trainings$.pipe(
    map((trainings: Training[]) => trainings.length)
  );

  exercises$: Observable<Exercise[]> = this.store.select(selectAllExercises);
  exerciseCount$: Observable<number> = this.exercises$.pipe(
    map((exercises: Exercise[]) => exercises.length)
  );

  users$: Observable<User[]> = this.store.select(selectAllUsers);
  gymMembers$: Observable<User[]> = this.store.select(selectGymMembers);
  currentUser$: Observable<User> = this.store.select(selectUser);
  userCount$: Observable<number> = this.users$.pipe(
    map((users: User[]) => users.length)
  );

}
