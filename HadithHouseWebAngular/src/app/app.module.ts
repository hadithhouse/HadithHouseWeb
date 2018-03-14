import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {FacebookService} from './facebook.service';
import {HadithsComponent} from './hadiths/hadiths.component';

/*
 * Use this later for invalid URLs.
  { path: '**', component: PageNotFoundComponent }
 */
const appRoutes: Routes = [
  {path: 'hadiths', component: HadithsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HadithsComponent
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
