import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserEntityService } from '../../store/user/user-entity.service';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {
  private readonly userEntityService = inject(UserEntityService);
  private readonly router = inject(Router);
  isAdmin: boolean = this.userEntityService.getIsAdmin();


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

