import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/users.model';
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
  @Input() routeNameBack: string | null = null
  @Input() homeMode: boolean = false;
  @Input() currentUser: User = {} as User;
  @Input() isAdmin: boolean = false;
  @Input() routeName: string = this.isAdmin ? '/personal/home' : '/members/home';

  constructor(private location: Location) { }

  goBack(): void {
    if (!this.routeNameBack) {
      this.location.back();
    }
  }
}
