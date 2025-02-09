import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthEntityService } from '../store/auth-entity.service';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {
  private readonly authEntityService = inject(AuthEntityService);
  private readonly router = inject(Router);
  isAdmin: boolean = this.authEntityService.getIsAdmin();


  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      if(this.isAdmin) {
        this.router.navigateByUrl('/personal/home');
      } else {
        this.router.navigateByUrl('/members/home');
      }
    }, 2000);
  }
}

