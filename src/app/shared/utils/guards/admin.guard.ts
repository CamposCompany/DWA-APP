import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthEntityService } from '../../../auth/store/auth-entity.service';

export const adminGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const authEntityService = inject(AuthEntityService);
  
  const isUserAdmin = await firstValueFrom(authEntityService.isAdmin$);
  
  if (!isUserAdmin) {
    router.navigate(['/members/home']);
    return false;
  }

  return true;
};
