import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../shared/services/user.service';
import { concatMap, map } from 'rxjs';
import { UserActions } from './action-types';

@Injectable()
export class UserEffects {
  private readonly userService = inject(UserService);
  private readonly actions$ = inject(Actions);

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUsers),
    concatMap(() => this.userService.getAllUsers()),
    map(users => UserActions.allUsersLoaded({ users }))
  ));
} 