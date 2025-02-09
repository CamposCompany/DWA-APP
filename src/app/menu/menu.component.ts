import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';
import { LoadingService } from '../shared/services/loading.service';
import { Observable } from 'rxjs';
import { User } from '../shared/models/users';
import { AuthEntityService } from '../auth/store/auth-entity.service';


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
  private readonly authEntityService = inject(AuthEntityService);
  private readonly router = inject(Router);
  private readonly loadingService = inject(LoadingService);

  currentUser$: Observable<User> = this.authEntityService.currentUser$;

  logout(): void {
    const logout$ = this.authEntityService.logout();

    this.loadingService.showLoaderUntilCompleted(logout$).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      }
    });
  }
}
