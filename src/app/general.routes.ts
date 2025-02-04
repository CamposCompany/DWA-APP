import { Routes } from '@angular/router';

export const GENERAL_ROUTES: Routes = [
  {
    path: 'training/:id',
    loadComponent: () => 
    import('./shared/pages/training-view/training-view.component').then((m) => m.TrainingViewComponent)
  },
  {
    path: 'exercise/:exerciseId',
    loadComponent: () => 
      import('./shared/pages/exercise-view/exercise-view.component').then((m) => m.ExerciseViewComponent)
  },
  {
    path: "training/:trainingId/exercise/:exerciseId",
    loadComponent: () => 
      import('./shared/pages/exercise-view/exercise-view.component').then((m) => m.ExerciseViewComponent)
  }
]
