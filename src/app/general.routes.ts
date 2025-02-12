import { Routes } from '@angular/router';
import { authGuard } from './shared/utils/guards/auth.guard';
import { provideEffects } from '@ngrx/effects';
import { ExerciseViewEffects } from './store/exercise-view/exercise-view.effect';

export const GENERAL_ROUTES: Routes = [
  {
    path: 'training/:id',
    loadComponent: () => 
    import('./shared/pages/training-view/training-view.component').then((m) => m.TrainingViewComponent),
    providers: [provideEffects(ExerciseViewEffects)]
  },
  {
    path: 'exercise-view',
    loadComponent: () => 
      import('./shared/pages/exercise-view/exercise-view.component').then((m) => m.ExerciseViewComponent),
    canActivate: [authGuard],
    providers: [provideEffects(ExerciseViewEffects)]
  },
  {
    path: 'challenges',
    loadComponent: () => 
      import('./shared/pages/challenges-view/challenges-view.component').then((m) => m.ChallengesViewComponent),
  }
]
