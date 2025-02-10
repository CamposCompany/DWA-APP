import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { first, tap, filter } from 'rxjs/operators';
import { UserEntityService } from './user-entity.service';

export const userResolver: ResolveFn<boolean> = () => {
  const userEntityService = inject(UserEntityService);
  
  return userEntityService.loaded$.pipe(
    tap(loaded => {
      if (!loaded) {
        userEntityService.getAll();
      }
    }),
    filter(loaded => !!loaded),
    first()
  );
}; 