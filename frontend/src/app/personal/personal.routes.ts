import { Routes } from '@angular/router';

export const PERSONAL_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => 
      import('./home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'trainings',
    loadComponent: () => 
      import('./management/trainings/trainings.component').then((m) => m.TrainingsComponent)
  },
  {
    path: 'exercises',
    loadComponent: () => 
      import('./management/exercises/exercises.component').then((m) => m.ExercisesComponent)
  },
  {
    path: 'gym-members',
    loadComponent: () => 
      import('./management/gym-members/gym-members.component').then((m) => m.GymMembersComponent)
  }
];
