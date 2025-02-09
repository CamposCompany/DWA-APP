import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { User } from '../../shared/models/users';
import { map } from 'rxjs/operators';
import { UserDataService } from './user-data.service';

@Injectable({ providedIn: 'root' })
export class UserEntityService extends EntityCollectionServiceBase<User> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Users', serviceElementsFactory);
  }

  getGymMembers() {
    return this.entities$.pipe(
      map(users => users.filter(user => user.roles.some(role => role.name === 'user')))
    );
  }
} 