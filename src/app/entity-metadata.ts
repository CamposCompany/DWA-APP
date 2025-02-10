import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { Training } from './shared/models/training';
import { Exercise } from './shared/models/exercise';
import { User } from './shared/models/users';
import { AuthenticateLoginData } from './shared/models/authenticate';
import { ExerciseViewState } from './store/exercise-view/exercise-view.state';

export const entityMetadata: EntityMetadataMap = {
  Trainings: {
    entityName: 'Trainings',
    selectId: (training: Training) => training.id,
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Exercises: {
    entityName: 'Exercises',
    selectId: (exercise: Exercise) => exercise.id
  },
  Users: {
    entityName: 'Users',
    selectId: (user: User) => user.id,
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Auth: {
    entityName: 'Auth',
    selectId: (auth: AuthenticateLoginData) => auth?.user?.id ?? 0,
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  ExerciseView: {
    selectId: (state: ExerciseViewState) => 'current',
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  }
};

const pluralNames = { Training: 'Trainings', User: 'Users', Exercise: 'Exercises' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
