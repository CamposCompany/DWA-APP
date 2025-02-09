import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { BodyClassDirective } from './shared/directives/body-class.directive';

import { AuthEntityService } from './auth/store/auth-entity.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, BodyClassDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'DWAPP';
  constructor() {}

  ngOnInit() {
  }
}
