import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

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
import {UserApiService} from './services/user-api.service';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {APP_BASE_HREF} from '@angular/common';
import {TruncatePipe} from './pipes/pipes';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

export const MODULE_IMPORTS = [
  AppAsideModule,
  AppBreadcrumbModule.forRoot(),
  AppFooterModule,
  AppHeaderModule,
  AppRoutingModule,
  AppSidebarModule,
  BrowserModule,
  BsDropdownModule.forRoot(),
  CoreModule.forRoot(),
  FontAwesomeModule,
  HttpClientModule,
  PerfectScrollbarModule,
  TabsModule.forRoot()
];

export const MODULE_DECLARATIONS = [
  AppComponent,
  DefaultLayoutComponent,
  P404Component,
  AppComponent,
  TruncatePipe,
];

export const MODULE_PROVIDERS = [
  FacebookService,
  // Specify the base URL for router.
  {provide: APP_BASE_HREF, useValue: '/'},
  // Hadith House API services
  UserApiService,
];

@NgModule({
  imports: MODULE_IMPORTS,
  declarations: MODULE_DECLARATIONS,
  providers: MODULE_PROVIDERS,
  bootstrap: [AppComponent]
})
export class AppModule {
}
