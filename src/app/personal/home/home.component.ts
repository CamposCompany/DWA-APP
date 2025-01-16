import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable, take } from 'rxjs';
import { UsersStore } from '../../shared/stores/users.store';
import { TrainingStore } from '../../shared/stores/trainings.store';
import { ExercisesStore } from '../../shared/stores/exercises.store';
import { User } from '../../shared/models/users';
import { Training } from '../../shared/models/training';
import { Exercise } from '../../shared/models/exercise';
import { KeymetricPanelComponent } from './components/keymetric-panel/keymetric-panel.component';
import { ActionsPanelComponent } from './components/actions-panel/actions-panel.component';
import { CostumersPanelComponent } from './components/costumers-panel/costumers-panel.component';
import { TrainingsPanelComponent } from './components/trainings-panel/trainings-panel.component';
import { LoadingService } from '../../shared/services/loading.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    KeymetricPanelComponent,
    ActionsPanelComponent,
    TrainingsPanelComponent,
    CostumersPanelComponent,
    RouterModule
],
  providers: [LoadingService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  users$: Observable<User[]> = this.usersStore.getUsers();
  costumers$: Observable<User[]> = this.usersStore.getCostumers();
  currentUser$: Observable<User> = this.usersStore.getCurrentUser();
  userCount$: Observable<number> = this.users$.pipe(
    map((users: User[]) => users.length)
  );

  trainings$: Observable<Training[]> = this.trainingsStore.getTrainings();

  trainingLimited$ = this.trainings$.pipe(
    map((trainings) => trainings.slice(0, 3))
  );

  trainingCount$: Observable<number> = this.trainings$.pipe(
    map((trainings: Training[]) => trainings.length)
  );

  exercises$: Observable<Exercise[]> = this.exercisesStore.getExercises();
  exerciseCount$: Observable<number> = this.exercises$.pipe(
    map((exercises: Exercise[]) => exercises.length)
  );

  constructor(
    private usersStore: UsersStore,
    private trainingsStore: TrainingStore,
    private exercisesStore: ExercisesStore
  ) {
    this.initializeData();
  }

  private initializeData(): void {
    this.checkAndLoadCurrentUser();
    this.checkAndLoadAllUsers();
  }


  private checkAndLoadCurrentUser(): void {
    this.currentUser$
      .pipe(take(1))
      .subscribe((currentUser: User) => {
        if (!currentUser || currentUser.id === 0) {
          this.usersStore.loadCurrentUser();
        }
      });
  }


  private checkAndLoadAllUsers(): void {
    this.users$
      .pipe(take(1))
      .subscribe((users: User[]) => {
        if (!users || users.length === 0) {
          this.usersStore.loadAllUsers();
        }
      });
  }
}
