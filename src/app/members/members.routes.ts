import { Routes } from '@angular/router';

export const MEMBERS_ROUTES: Routes = [
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
    path: 'trainings/:id',
    loadComponent: () => 
      import('./view/user-training-view/user-training-view.component').then((m) => m.UserTrainingViewComponent)
  },
];
