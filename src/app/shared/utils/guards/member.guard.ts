import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { isAdminSelector } from '../../../auth/login/store/auth.selectors';
import { Store } from '@ngrx/store';

export const memberGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  const isUserAdmin = await firstValueFrom(store.select(isAdminSelector));

  if (!isUserAdmin) {
    return true;
  }
  router.navigate(['/personal/home']);
  return false;
};
