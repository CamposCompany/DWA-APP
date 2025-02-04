import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { isAdminSelector } from '../login/store/auth.selectors';
import { AppState } from '../../store';


@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {
  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);

  constructor() { }

  ngOnInit() {
    this.store.pipe(select(isAdminSelector))
      .subscribe(isAdminValue => {
        const targetRoute = isAdminValue
          ? '/personal/home'
          : '/members/home';

        setTimeout(() => {
          this.router.navigateByUrl(targetRoute);
        }, 2500);
      });
  }
}
