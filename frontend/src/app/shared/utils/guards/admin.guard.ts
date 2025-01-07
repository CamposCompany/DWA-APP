import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

const ALLOWED_ROLES = ['admin', 'owner', 'personal'];

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const currentUser = localStorage.getItem('currentUser');
  
  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }

  const user = JSON.parse(currentUser);
  
  if (!user.roles || !user.roles.some((role: any) => ALLOWED_ROLES.includes(role.name))) {
    console.log(user.roles);
    router.navigate(['/members/home']);
    return false;
  }

  return true;
};
