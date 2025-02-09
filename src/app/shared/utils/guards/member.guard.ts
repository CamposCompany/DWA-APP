import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthEntityService } from '../../../auth/store/auth-entity.service';
import { firstValueFrom } from 'rxjs';
export const memberGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authEntityService = inject(AuthEntityService);

  const isUserAdmin = await firstValueFrom(authEntityService.isAdmin$);

  if (!isUserAdmin) {
    return true;
  }
  router.navigate(['/personal/home']);
  return false;
};
