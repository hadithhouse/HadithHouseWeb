import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS
} from '@angular/common/http';

import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';
import {AppComponent} from '../app.component';
import {AuthService} from '../auth.service';

/**
 * HTTP interceptor which sets a flag indicating whether there are pending
 * requests or not. This is useful to show a spinner when some requests are
 * still loading.
 */
@Injectable()
export class LoadingStatusHttpInterceptor implements HttpInterceptor {
  pendingRequests = 0;
  static isLoading: Subject<boolean> = new Subject<boolean>();

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    this.incrementPendingRequests();
    return next.handle(req).pipe(finalize(() => {
      this.decrementPendingRequests();
    }));
  }

  // noinspection JSMethodCanBeStatic
  isLoadingObservable(): Observable<boolean> {
    return LoadingStatusHttpInterceptor.isLoading.asObservable();
  }

  private incrementPendingRequests() {
    this.pendingRequests += 1;
    if (this.pendingRequests === 1) {
      LoadingStatusHttpInterceptor.isLoading.next(true);
    }
  }

  private decrementPendingRequests() {
    this.pendingRequests -= 1;
    if (this.pendingRequests === 0) {
      LoadingStatusHttpInterceptor.isLoading.next(false);
    }
    if (this.pendingRequests < 0) {
      this.pendingRequests = 0;
    }
  }
}

/**
 * A service for injecting the current FB access token to requests.
 */
@Injectable()
export class FbAccessTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (this.authService.fbAccessToken !== null) {
      const newReq = req.clone({
        params: req.params.append('fb_token', this.authService.fbAccessToken)
      });
      return next.handle(newReq);
    } else {
      return next.handle(req);
    }
  }
}

export const HTTP_INTERCEPTOR_PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingStatusHttpInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: FbAccessTokenInterceptor,
    multi: true
  }
];

