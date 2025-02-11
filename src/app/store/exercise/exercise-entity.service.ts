import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Exercise } from '../../shared/models/exercise.model';

@Injectable({ providedIn: 'root' })
export class ExerciseEntityService extends EntityCollectionServiceBase<Exercise> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Exercises', serviceElementsFactory);
  }
} 