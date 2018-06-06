import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {AppComponent} from './app.component';
import {FacebookService} from './services/facebook.service';
import {HadithsComponent} from './hadiths/hadiths.component';
import {BooksComponent} from './books/books.component';
import {PersonsComponent} from './persons/persons.component';
import {HadithTagsComponent} from './hadithtags/hadithtags.component';
import {UsersComponent} from './users/users.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {TruncatePipe} from './pipes/pipes';
import {PageNavComponent} from './page-nav/page-nav.component';
import {
  HTTP_INTERCEPTOR_PROVIDERS,
  LoadingStatusHttpInterceptor
} from './http-interceptors';
import {AuthService} from './services/auth.service';
import {HadithTagComponent} from './hadithtag/hadithtag.component';
import {FormsModule} from '@angular/forms';
import {UserApiService} from './services/user-api.service';
import {HadithApiService} from './services/hadith-api.service';
import {BookApiService} from './services/book-api.service';
import {APP_BASE_HREF} from '@angular/common';
import {HadithTagApiService} from './services/hadith-tag-api.service';

export const appRoutes: Routes = [
  {path: 'hadiths', component: HadithsComponent},
  {path: 'books', component: BooksComponent},
  {path: 'persons', component: PersonsComponent},
  {path: 'hadithtag/:id', component: HadithTagComponent},
  {path: 'hadithtags', component: HadithTagsComponent},
  {path: 'users', component: UsersComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: PageNotFoundComponent}
];

export const moduleDeclarations = [
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
];

export const moduleImports = [
  BrowserModule,
  RouterModule.forRoot(appRoutes),
  HttpClientModule,
  FontAwesomeModule,
  FormsModule
];

export const moduleProviders = [
  AuthService,
  FacebookService,
  // Interceptor for showing/hiding loading indicator.
  LoadingStatusHttpInterceptor,
  HTTP_INTERCEPTOR_PROVIDERS,
  // Specify the base URL for router.
  {provide: APP_BASE_HREF, useValue: '/'},
  // Hadith House API services
  HadithApiService,
  HadithTagApiService,
  BookApiService,
  UserApiService
];

@NgModule({
  declarations: moduleDeclarations,
  imports: moduleImports,
  exports: [],
  providers: moduleProviders,
  bootstrap: [AppComponent]
})
export class AppModule {
}
