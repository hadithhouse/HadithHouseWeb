import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from './auth.service';
import {LoadingStatusService} from './loading-status.service';
import {
  FbAccessTokenInterceptor,
  LoadingStatusHttpInterceptor
} from './interceptors';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthService,
        LoadingStatusService,
        // Interceptor for showing/hiding loading indicator.
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingStatusHttpInterceptor,
          multi: true
        },
        // Interceptor for adding FB access token to HTTP requests.
        {
          provide: HTTP_INTERCEPTORS,
          useClass: FbAccessTokenInterceptor,
          multi: true
        }
      ]
    };
  }
}
