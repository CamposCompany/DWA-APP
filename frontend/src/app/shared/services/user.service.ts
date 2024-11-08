import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private routeLogin: string = 'users';

  constructor(private http: Http) { }

  updateUser(payload: { password: string, confirm_password: string, token: string }, id: number): Observable<any> {

    return this.http.put(`${this.routeLogin}/${id}`, payload);
  }
}
