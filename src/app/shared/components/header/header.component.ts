import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() hasHome: boolean = false;
  @Input() routeName: string = '/dashboard'
  @Input() routeNameBack: string | null = ''

  constructor(private location: Location) { }

  goBack(): void {
    if (!this.routeNameBack) {
      this.location.back();
    }
  }
}
