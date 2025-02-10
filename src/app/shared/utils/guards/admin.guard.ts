import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserEntityService } from '../../../store/user/user-entity.service';

export const adminGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const userEntityService = inject(UserEntityService);
  
  const isUserAdmin = userEntityService.getIsAdmin();
  
  if (!isUserAdmin) {
    router.navigate(['/members/home']);
    return false;
  }

  return true;
};
