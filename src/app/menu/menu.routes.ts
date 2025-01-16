import { Routes } from '@angular/router';
import { authGuard } from '../shared/utils/guards/auth.guard';

export const MENU_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./menu.component').then((m) => m.MenuComponent),
  },
  {
    path: 'user-data',
    loadComponent: () => import('./user-data/user-data.component').then((m) => m.UserDataComponent),
    canActivate: [authGuard]
  }
];
