import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { TrainingEffects } from '../store/training/training.effects';
import { trainingResolver } from '../store/training/training.resolver';

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
      trainings: trainingResolver
    },
    providers: [
      provideEffects(TrainingEffects)
    ]
  },
  {
    path: 'trainings/:id',
    loadComponent: () => 
      import('./view/user-training-view/user-training-view.component').then((m) => m.UserTrainingViewComponent)
  },
];
