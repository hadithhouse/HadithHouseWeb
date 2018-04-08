import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {FacebookService} from './facebook.service';
import {HadithsComponent} from './hadiths/hadiths.component';
import {BooksComponent} from './books/books.component';
import {PersonsComponent} from './persons/persons.component';
import {HadithTagsComponent} from './hadithtags/hadithtags.component';
import {UsersComponent} from './users/users.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';

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
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  exports: [
  ],
  providers: [
    FacebookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
