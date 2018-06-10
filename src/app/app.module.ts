import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {
  PerfectScrollbarModule,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import {AppComponent} from './app.component';

// Import containers
import {DefaultLayoutComponent} from './containers';

import {P404Component} from './views/error/404.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import {AppRoutingModule} from './app.routing';

// Import 3rd party components
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {FacebookService} from './services/facebook.service';
import {
  HTTP_INTERCEPTOR_PROVIDERS,
  LoadingStatusHttpInterceptor
} from './http-interceptors';
import {AuthService} from './services/auth.service';
import {UserApiService} from './services/user-api.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppRoutingModule,
    AppSidebarModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    PerfectScrollbarModule,
    TabsModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
  ],
  providers: [
    AuthService,
    FacebookService,
    // Interceptor for showing/hiding loading indicator.
    LoadingStatusHttpInterceptor,
    HTTP_INTERCEPTOR_PROVIDERS,
    // Hadith House API services
    UserApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
