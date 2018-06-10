// Low level imports
import 'bootstrap';

// Angular & RxJS imports
import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {debounceTime, timeout} from 'rxjs/operators';

// HadithHouse imports
import {AuthService} from './services/auth.service';
import {FacebookService, IFbMeResponse} from './services/facebook.service';
import {LoadingStatusHttpInterceptor} from './http-interceptors';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  showSpinner = false;

  constructor(private facebookService: FacebookService,
              private router: Router,
              private loadingStatusInterceptor: LoadingStatusHttpInterceptor,
              protected authService: AuthService) {
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.subscribeToLoadingStatusInterceptor();
  }

  private subscribeToLoadingStatusInterceptor() {
    this.loadingStatusInterceptor.isLoadingObservable()
      .pipe(debounceTime(100))
      .subscribe(showSpinner => {
        this.showSpinner = showSpinner;
      });
  }
}
