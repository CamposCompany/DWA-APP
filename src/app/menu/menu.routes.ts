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
  },
  {
    path: 'terms-privacy',
    loadComponent: () => import('./terms-privacy/terms-privacy.component').then((m) => m.TermsPrivacyComponent),
    canActivate: [authGuard]
  },
  {
    path: 'terms-security',
    loadComponent: () => import('./terms-security/terms-security.component').then((m) => m.TermsSecurityComponent),
    canActivate: [authGuard]
  }
];
