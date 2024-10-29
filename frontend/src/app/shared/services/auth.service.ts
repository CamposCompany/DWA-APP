import { Injectable } from '@angular/core';
import { Http } from './http.service';
import { Observable } from 'rxjs';
import { AuthenticateLogin } from '../models/AuthenticateLogin';
import { FormGroup } from '@angular/forms';

@Injectable()
export class AuthService {
  private route: string = 'login';

  constructor(private http: Http) { }

  authenticate(auth: FormGroup): Observable<AuthenticateLogin> {
    return this.http.post(`${this.route}`, auth);
  }
}
