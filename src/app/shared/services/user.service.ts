import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from './http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private routeLogin: string = 'users';

  constructor(private http: Http) { }

  updateUser(
    payload: { password: string; confirm_password: string },
    id: string
  ): Observable<any> {
    return this.http.put(`${this.routeLogin}/${id}`, payload);
  }
}
