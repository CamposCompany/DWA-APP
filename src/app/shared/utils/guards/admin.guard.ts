import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { isAdminSelector } from '../../../auth/login/store/auth.selectors';

export const adminGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const store = inject(Store);
  
  const isUserAdmin = await firstValueFrom(store.select(isAdminSelector));
  
  if (!isUserAdmin) {
    router.navigate(['/members/home']);
    return false;
  }

  return true;
};
