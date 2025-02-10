import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { tap, filter, first } from 'rxjs/operators';
import { ExerciseEntityService } from './exercise-entity.service';

export const exerciseResolver: ResolveFn<boolean> = () => {
  const exerciseEntityService = inject(ExerciseEntityService);
  
  return exerciseEntityService.loaded$.pipe(
    tap(loaded => {
      if (!loaded) {
        exerciseEntityService.getAll();
      }
    }),
    filter(loaded => !!loaded),
    first()
  );
}; 