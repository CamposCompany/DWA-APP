import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from './http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(Http);
  private readonly routes = {
    updateUser: 'users'
  } as const;

  updateUser(
    payload: { password: string; confirm_password: string },
    id: number
  ): Observable<any> {
    return this.http.put(`${this.routes.updateUser}/${id}`, payload);
  }
}
