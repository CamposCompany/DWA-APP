import { inject, Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Http } from './http.service';
import { User, UserData } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(Http);
  private readonly routes = {
    users: 'users',
    updateUser: 'users'
  } as const;

  getAllUsers(): Observable<User[]> {
    return this.http.get<UserData>(this.routes.users).pipe(
      map(res => res.data.users),
      catchError((err) => {
        const message = "Could not load users";
        alert(message);
        return throwError(() => err);
      })
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<UserData>(`${this.routes.users}/${id}`).pipe(
      map(res => res.data.users[0]),
      catchError((err) => {
        const message = "Could not load user";
        alert(message);
        return throwError(() => err);
      })
    );
  }

  updateUser(
    payload: { password: string; confirm_password: string },
    id: number
  ): Observable<any> {
    return this.http.put(`${this.routes.updateUser}/${id}`, payload);
  }
}
