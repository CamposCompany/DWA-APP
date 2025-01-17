import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UsersStore } from '../../stores/users.store';

const ALLOWED_ROLES = ['admin', 'owner', 'personal'];

export const adminGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const usersStore = inject(UsersStore);
  const currentUser = await firstValueFrom(usersStore.currentUser$);
  
  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }
  
  if (!currentUser.roles || !currentUser.roles.some((role: any) => ALLOWED_ROLES.includes(role.name))) {
    router.navigate(['/members/home']);
    return false;
  }

  return true;
};
