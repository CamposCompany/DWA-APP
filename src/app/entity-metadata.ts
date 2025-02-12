import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { Training } from './shared/models/training.model';
import { Exercise } from './shared/models/exercise.model';
import { User } from './shared/models/users.model';
import { AuthenticateLoginData } from './shared/models/authenticate.model';
import { Challenge } from './shared/models/challenge.model';

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
  TrainingView: {
    entityName: 'TrainingView',
    selectId: (training: Training) => training.id
  },
  Auth: {
    entityName: 'Auth',
    selectId: (auth: AuthenticateLoginData) => auth?.user?.id ?? 0,
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Challenges: {
    entityName: 'Challenges',
    selectId: (challenge: Challenge) => challenge.id
  }
};

const pluralNames = { Training: 'Trainings', User: 'Users', Exercise: 'Exercises' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
