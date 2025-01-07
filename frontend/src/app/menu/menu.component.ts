import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';
import { AuthService } from '../shared/services/auth.service';
import { LoadingService } from '../shared/services/loading.service';

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
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService
  ) { }

  logout(): void {
    const logout$ = this.authService.logout();

    this.loadingService.showLoaderUntilCompleted(logout$).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
      }
    });
  }
}
