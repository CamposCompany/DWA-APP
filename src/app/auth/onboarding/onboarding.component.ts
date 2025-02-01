import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsersStore } from '../../shared/stores/users.store';
import { TrainingStore } from '../../shared/stores/trainings.store';
import { ExercisesStore } from '../../shared/stores/exercises.store';
import { AppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { isAdminSelector } from '../login/store/auth.selectors';


@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {
  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);
  private readonly usersStore = inject(UsersStore);
  private readonly traningsStore = inject(TrainingStore);
  private readonly exerciseStore = inject(ExercisesStore);

  constructor() { }

  ngOnInit() {
    this.store.pipe(select(isAdminSelector))
      .subscribe(isAdminValue => {
        const targetRoute = isAdminValue
          ? '/personal/home'
          : '/members/home';

        if (isAdminValue) {
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
