import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {
  // uncomment this when we have a dashboard page

  // constructor(private router: Router) {
  //   setTimeout(() => {
  //     this.router.navigateByUrl('/path-to-dashboard')
  //   }, 2000);
  //  }
}
