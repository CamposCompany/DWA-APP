import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { User, UserData } from '../shared/models/users';
import { Http } from '../shared/services/http.service';
import { LoadingService } from '../shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class UsersStore {
  private route: string = 'users';
  private usersSubject = new BehaviorSubject<User[]>([]);
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

  users$: Observable<User[]> = this.usersSubject.asObservable();
  currentUser$: Observable<User> = this.currentUserSubject.asObservable();

  constructor(private http: Http, private loadingService: LoadingService) { }

  public loadAllUsers() {
    const loadUsers$ = this.http.get<UserData>(`${this.route}`)
      .pipe(
        catchError((err) => {
          const message = "Could not load users";
          alert(message);
          return throwError(() => err);
        }),
        tap((users) => this.usersSubject.next(users.data.users))
      );


    this.loadingService.showLoaderUntilCompleted(loadUsers$).subscribe();
  }

  public loadCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getCostumers(): Observable<User[]> {
    return this.users$.pipe(
      map(users => users.filter(user => user.roles.some(role => role.name === 'user')))
    );
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
