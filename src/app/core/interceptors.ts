import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS
} from '@angular/common/http';

import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {LoadingStatusService} from './loading-status.service';

/**
 * HTTP interceptor which sets a flag indicating whether there are pending
 * requests or not. This is useful to show a spinner when some requests are
 * still loading.
 */
@Injectable()
export class LoadingStatusHttpInterceptor implements HttpInterceptor {
  constructor(private loadingStatusService: LoadingStatusService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    this.loadingStatusService.incrementPendingRequests();
    return next.handle(req).pipe(finalize(() => {
      this.loadingStatusService.decrementPendingRequests();
    }));
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
