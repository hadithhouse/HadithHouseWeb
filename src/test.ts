// This file is required by karma.conf.js and loads recursively all the
// .spec and framework files

import 'zone.js/dist/zone-testing';
import {getTestBed, TestBed} from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {FormsModule} from '@angular/forms';
import {FacebookService} from './app/facebook.service';
import {
  HadithHouseApiService,
  HadithTagService,
  UserService
} from './app/hadith-house-api.service';
import {AuthService} from './app/auth.service';
import {
  HTTP_INTERCEPTOR_PROVIDERS,
  LoadingStatusHttpInterceptor
} from './app/http-interceptors';
import {AppComponent} from './app/app.component';
import {HadithsComponent} from './app/hadiths/hadiths.component';
import {HadithTagComponent} from './app/hadithtag/hadithtag.component';
import {BooksComponent} from './app/books/books.component';
import {PersonsComponent} from './app/persons/persons.component';
import {HadithTagsComponent} from './app/hadithtags/hadithtags.component';
import {UsersComponent} from './app/users/users.component';
import {HomeComponent} from './app/home/home.component';
import {
  PageNotFoundComponent
} from './app/page-not-found/page-not-found.component';
import {TruncatePipe} from './app/pipes/pipes';
import {PageNavComponent} from './app/page-nav/page-nav.component';
import {appRoutes} from './app/app.module';
import {APP_BASE_HREF} from '@angular/common';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);


export function configureTestBed() {
  TestBed.configureTestingModule(
    {
      declarations: [
        AppComponent,
        HadithsComponent,
        BooksComponent,
        PersonsComponent,
        HadithTagComponent,
        HadithTagsComponent,
        UsersComponent,
        HomeComponent,
        PageNotFoundComponent,
        TruncatePipe,
        PageNavComponent
      ],
      imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        FontAwesomeModule,
        FormsModule
      ],
      providers: [
        FacebookService,
        HadithTagService,
        UserService,
        AuthService,
        HadithHouseApiService,
        LoadingStatusHttpInterceptor,
        HTTP_INTERCEPTOR_PROVIDERS,
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    }
  ).compileComponents();
}

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
