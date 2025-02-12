import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { tap, filter, first } from 'rxjs/operators';
import { ChallengeEntityService } from './challenge-entity.service';
import { UserEntityService } from '../user/user-entity.service';

export const challengeResolver: ResolveFn<boolean> = () => {
  const challengeEntityService = inject(ChallengeEntityService);
  const userEntityService = inject(UserEntityService);
  
  const isAdmin = userEntityService.getIsAdmin();
  
  return challengeEntityService.loaded$.pipe(
    tap(loaded => {
      if (!loaded) {
        if(isAdmin) {
          challengeEntityService.getAll();
        } else {
          challengeEntityService.getTodayChallenges();
        }
      }
    }),
    filter(loaded => !!loaded),
    first()
  );
};
