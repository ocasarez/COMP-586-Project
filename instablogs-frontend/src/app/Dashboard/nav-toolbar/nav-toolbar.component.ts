import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { OktaAuthService } from '@okta/okta-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.css']
})

export class NavToolbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isAuthenticated: boolean;
  constructor(private breakpointObserver: BreakpointObserver, public oktaAuth: OktaAuthService, public router: Router) {
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  ngOnInit() {
    this.oktaAuth.isAuthenticated().then((auth) => {
      this.isAuthenticated = auth;
    });
  }

  login() {
    this.oktaAuth.loginRedirect();
  }
  logout() {
    this.oktaAuth.logout('/');
    this.router.navigate(['/']);
  }

}
