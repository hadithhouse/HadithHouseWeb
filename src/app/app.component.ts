// Low level imports
import 'bootstrap';

// Angular & RxJS imports
import {Component, Injector, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

// HadithHouse imports
import {FacebookService} from './services/facebook.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private facebookService: FacebookService,
              private router: Router,
              private injector: Injector) {
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
