import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { tap, filter, first } from 'rxjs/operators';
import { ChallengeEntityService } from './challenge-entity.service';

export const challengeResolver: ResolveFn<boolean> = () => {
  const challengeEntityService = inject(ChallengeEntityService);
  
  return challengeEntityService.loaded$.pipe(
    tap(loaded => {
      if (!loaded) {
        challengeEntityService.getAll();
      }
    }),
    filter(loaded => !!loaded),
    first()
  );
};
