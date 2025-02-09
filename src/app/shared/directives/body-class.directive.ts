import { Directive, Renderer2, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthEntityService } from '../../auth/store/auth-entity.service';

@Directive({
  selector: '[appBodyClass]',
  standalone: true
})
export class BodyClassDirective implements OnInit, OnDestroy {
  private routerSubscription: Subscription;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private authEntityService: AuthEntityService,
    private router: Router
  ) {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateClasses();
      }
    });
  }

  ngOnInit(): void {
    this.updateClasses();
  }

  private updateClasses(): void {
    const isLoggedIn = !!this.authEntityService.getToken();
    const isFirstAccess = this.router.url.includes('first-access');

    if (isLoggedIn && !isFirstAccess) {
      this.renderer.addClass(this.el.nativeElement, 'logged-in');
      this.renderer.removeClass(this.el.nativeElement, 'not-logged-in');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'not-logged-in');
      this.renderer.removeClass(this.el.nativeElement, 'logged-in');
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
