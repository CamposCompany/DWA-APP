import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

export const tokenGuard = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const token = route.queryParams['token'] || route.params['token'];
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
