import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { tap, filter, first } from 'rxjs/operators';
import { TrainingEntityService } from './training-entity.service';
import { AuthEntityService } from '../../auth/store/auth-entity.service';

export const trainingResolver: ResolveFn<boolean> = () => {
  const trainingEntityService = inject(TrainingEntityService);
  const authEntityService = inject(AuthEntityService);
  
  const isAdmin = authEntityService.getIsAdmin();
  const currentUser = authEntityService.getCurrentUser();

  
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
