import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appBodyClass]',
  standalone: true
})
export class BodyClassDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const isLoggedIn = this.authService.isLoggedIn();

    console.log('oi');

    if (isLoggedIn) {
      this.renderer.addClass(this.el.nativeElement, 'logged-in');
      this.renderer.removeClass(this.el.nativeElement, 'not-logged-in');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'not-logged-in');
      this.renderer.removeClass(this.el.nativeElement, 'logged-in');
    }
  }
}
