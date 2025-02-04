import { Routes } from '@angular/router';
import { trainingResolver } from '../store/training/training.resolver';
import { provideEffects } from '@ngrx/effects';
import { TrainingEffects } from '../store/training/training.effects';
import { exerciseResolver } from '../store/exercise/exercise.resolver';
import { ExerciseEffects } from '../store/exercise/exercise.effects';
import { userResolver } from '../store/user/user.resolver';
import { UserEffects } from '../store/user/user.effects';

export const PERSONAL_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    resolve: {
      trainings: trainingResolver,
      exercises: exerciseResolver,
      users: userResolver
    },
    providers: [
      provideEffects(TrainingEffects, ExerciseEffects, UserEffects)
    ]
  },
  {
    path: 'trainings',
    loadComponent: () =>
      import('./management/trainings/trainings.component').then((m) => m.TrainingsComponent)
  },
  {
    path: 'trainings/:id',
    loadComponent: () =>
      import('./management/trainings/training-view/training-view.component').then((m) => m.TrainingViewComponent)
  },
  {
    path: 'exercises',
    loadComponent: () =>
      import('./management/exercises/exercises.component').then((m) => m.ExercisesComponent)
  },
  {
    path: 'exercises/:id',
    loadComponent: () =>
      import('./management/exercises/exercise-view/exercise-view.component').then((m) => m.ExerciseViewComponent)
  },
  {
    path: 'gym-members',
    loadComponent: () =>
      import('./management/gym-members/gym-members.component').then((m) => m.GymMembersComponent)
  }
];
