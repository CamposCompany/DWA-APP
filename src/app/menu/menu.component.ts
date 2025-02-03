import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';
import { AuthService } from '../shared/services/auth.service';
import { LoadingService } from '../shared/services/loading.service';
import { Observable } from 'rxjs';
import { User } from '../shared/models/users';
import { selectUser } from '../auth/login/store/auth.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../store';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent
  ]
})
export class MenuComponent {
  private readonly store = inject(Store<AppState>);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly loadingService = inject(LoadingService);

  currentUser$: Observable<User> = this.store.select(selectUser);

  logout(): void {
    const logout$ = this.authService.logout();

    this.loadingService.showLoaderUntilCompleted(logout$).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      }
    });
  }
}
