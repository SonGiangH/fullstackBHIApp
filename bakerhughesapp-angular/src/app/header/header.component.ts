import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  private routerSubscription: Subscription;

  constructor(private router: Router) {
    // Subscribe to router events to handle active link state
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Reset active class on all nav links
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
          link.classList.remove('active');
        });

        // Apply active class to the current route's nav link
        const currentRoute = event.urlAfterRedirects;
        const activeNavLink = document.querySelector(`.navbar-nav .nav-link[href='${currentRoute}']`);
        if (activeNavLink) {
          activeNavLink.classList.add('active');
        }
      }
    });
  }
    ngOnDestroy(): void {
      // Unsubscribe from router events to avoid memory leaks
      this.routerSubscription.unsubscribe();
    }
}
