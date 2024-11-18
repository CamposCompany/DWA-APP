import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Directive({
  selector: '[appBodyClass]',
  standalone: true
})
export class BodyClassDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const isLoggedIn = this.authService.isLoggedIn();
    const currentUrl = this.router.url;

    if (isLoggedIn && !currentUrl.includes('first-access')) {
      this.renderer.addClass(this.el.nativeElement, 'logged-in');
      this.renderer.removeClass(this.el.nativeElement, 'not-logged-in');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'not-logged-in');
      this.renderer.removeClass(this.el.nativeElement, 'logged-in');
    }
  }
}
