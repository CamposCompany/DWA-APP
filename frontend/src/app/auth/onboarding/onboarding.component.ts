import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersStore } from '../../shared/stores/users.store';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {
  constructor(private router: Router, private usersStore: UsersStore) {}

  ngOnInit(): void {
    this.usersStore.loadAllUsers();

    setTimeout(() => {
      this.router.navigateByUrl('/dashboard');
    }, 2500);
  }
}
