import { Routes } from '@angular/router';
import { trainingResolver } from '../store/training/training.resolver';
import { challengeResolver } from '../store/challenge/challenge.resolver';
export const MEMBERS_ROUTES: Routes = [
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
      challenges: challengeResolver
    }
  }
];
