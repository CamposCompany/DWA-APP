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
    token: string,
    id: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return this.http.put(`${this.routeLogin}/${id}`, payload, { headers });
  }
}
