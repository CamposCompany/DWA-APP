import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UsersStore } from '../../stores/users.store';

export const memberGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const usersStore = inject(UsersStore);
  const currentUser = await firstValueFrom(usersStore.currentUser$);

  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }

  if (currentUser.roles.some(role => role.name !== 'user')) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
