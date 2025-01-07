import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const memberGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const currentUser = localStorage.getItem('currentUser');
  
  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }

  const user = JSON.parse(currentUser);
  
  if (!user.roles || user.roles.length === 0) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
