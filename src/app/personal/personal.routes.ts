import { Routes } from '@angular/router';
import { trainingResolver } from '../store/training/training.resolver';
import { exerciseResolver } from '../store/exercise/exercise.resolver';
import { userResolver } from '../store/user/user.resolver';
import { adminGuard } from '../shared/utils/guards/admin.guard';
import { authGuard } from '../shared/utils/guards/auth.guard';
import { challengeResolver } from '../store/challenge/challenge.resolver';

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
      users: userResolver,
      challenges: challengeResolver
    },
  },
  {
    path: 'trainings',
    loadComponent: () =>
      import('./management/trainings/trainings.component').then((m) => m.TrainingsComponent),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'exercises',
    loadComponent: () =>
      import('./management/exercises/exercises.component').then((m) => m.ExercisesComponent),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'gym-members',
    loadComponent: () =>
      import('./management/gym-members/gym-members.component').then((m) => m.GymMembersComponent),
    canActivate: [authGuard, adminGuard]
  }
];
