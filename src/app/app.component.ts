import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { BodyClassDirective } from './shared/directives/body-class.directive';

import { Store } from '@ngrx/store';
import { AuthActions } from './auth/login/store/action.types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, BodyClassDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'DWAPP';
  private readonly store = inject(Store);

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.store.dispatch(AuthActions.login({ token, user: JSON.parse(localStorage.getItem('user') || '{}') }));
    }
  }
}
