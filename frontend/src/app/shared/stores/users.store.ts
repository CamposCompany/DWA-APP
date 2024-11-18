import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/users';
import { Http } from '../services/http.service';
import { HttpHeaders } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class UsersStore {
  private route: string = 'users';
  private userSubject = new BehaviorSubject<User[]>([]);
  private currentUserSubject = new BehaviorSubject<User>({
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    document: '',
    telephone: '',
    gender: '',
    active: 0,
    roles: []
  }
);

  users$: Observable<User[]> = this.userSubject.asObservable();
  currentUser$: Observable<User> = this.currentUserSubject.asObservable();

  constructor(private http: Http, private loadingService: LoadingService) { }

  public loadAllUsers() {
    const loadUsers$ = this.http.get<User[]>(`${this.route}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      }),
    })
      .pipe(
        catchError((err) => {
          const message = "Could not load users";
          alert(message);
          return throwError(() => err);
        }),
        tap((users) => this.userSubject.next(users))
      );


    this.loadingService.showLoaderUntilCompleted(loadUsers$).subscribe();
  }

  public loadCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(user);
    if (user)
      this.currentUserSubject.next(user);

    // localStorage.removeItem('currentUser');
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser$;
  }

  getUserById(id: number) {
    return this.users$.pipe(
      map((users) => users.filter((user) => user.id == id))
    )
  }
}
