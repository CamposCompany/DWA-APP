import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsersStore } from '../../shared/stores/users.store';
import { TrainingStore } from '../../shared/stores/trainings.store';
import { ExercisesStore } from '../../shared/stores/exercises.store';
import { AppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { isAdminSelector } from '../login/login.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {
  private isUserAdmin$: Observable<any>;
  private store = inject(Store)

  constructor(private router: Router, private usersStore: UsersStore, private traningsStore: TrainingStore, private exerciseStore: ExercisesStore) {
    this.isUserAdmin$ = this.store.pipe(select(isAdminSelector));
    let isUserAdmin: boolean;

    this.isUserAdmin$.subscribe(isAdminValue => {
      isUserAdmin = isAdminValue;

      const targetRoute = isUserAdmin
        ? '/personal/home'
        : '/members/home';

      if (isUserAdmin) {
        this.usersStore.loadAllUsers();
        this.traningsStore.loadAllTrainings();
        this.exerciseStore.loadAllExercises();
      } else {
        this.traningsStore.loadUserTrainings();
      }

      setTimeout(() => {
        this.router.navigateByUrl(targetRoute);
      }, 2500);
    });
  }
}
