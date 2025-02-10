import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { tap, filter, first } from 'rxjs/operators';
import { TrainingEntityService } from './training-entity.service';
import { UserEntityService } from '../user/user-entity.service';

export const trainingResolver: ResolveFn<boolean> = () => {
  const trainingEntityService = inject(TrainingEntityService);
  const userEntityService = inject(UserEntityService);
  
  const isAdmin = userEntityService.getIsAdmin();
  const currentUser = userEntityService.getCurrentUser();

  
  return trainingEntityService.loaded$.pipe(
    tap(loaded => {
      if (!loaded) {
        if(isAdmin) {
          trainingEntityService.getAll();
        } else {
          trainingEntityService.getUserTrainings(currentUser.id);
        }
      }
    }),
    filter(loaded => !!loaded),
    first()
  )
};
