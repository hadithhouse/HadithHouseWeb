import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {AppComponent} from './app.component';
import {FacebookService} from './facebook.service';
import {HadithsComponent} from './hadiths/hadiths.component';
import {BooksComponent} from './books/books.component';
import {PersonsComponent} from './persons/persons.component';
import {HadithTagsComponent} from './hadithtags/hadithtags.component';
import {UsersComponent} from './users/users.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {HadithHouseApiService} from './hadith-house-api.service';
import {TruncatePipe} from './pipes/pipes';
import {PageNavComponent} from './page-nav/page-nav.component';
import {
  HTTP_INTERCEPTOR_PROVIDERS,
  LoadingStatusHttpInterceptor
} from './http-interceptors';

const appRoutes: Routes = [
  {path: 'hadiths', component: HadithsComponent},
  {path: 'books', component: BooksComponent},
  {path: 'persons', component: PersonsComponent},
  {path: 'hadithtags', component: HadithTagsComponent},
  {path: 'users', component: UsersComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HadithsComponent,
    BooksComponent,
    PersonsComponent,
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
    FontAwesomeModule
  ],
  exports: [],
  providers: [
    FacebookService,
    HadithHouseApiService,
    LoadingStatusHttpInterceptor,
    HTTP_INTERCEPTOR_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
