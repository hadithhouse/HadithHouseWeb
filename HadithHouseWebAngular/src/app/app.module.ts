import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {FacebookService} from './facebook.service';
import {HadithsComponent} from './hadiths/hadiths.component';
import { BooksComponent } from './books/books.component';
import { PersonsComponent } from './persons/persons.component';
import { HadithTagsComponent } from './hadithtags/hadithtags.component';
import { UsersComponent } from './users/users.component';

/*
 * Use this later for invalid URLs.
  { path: '**', component: PageNotFoundComponent }
 */
const appRoutes: Routes = [
  {path: 'hadiths', component: HadithsComponent},
  {path: 'books', component: BooksComponent},
  {path: 'persons', component: PersonsComponent},
  {path: 'hadithtags', component: HadithTagsComponent},
  {path: 'users', component: UsersComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HadithsComponent,
    BooksComponent,
    PersonsComponent,
    HadithTagsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true // debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    FacebookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
