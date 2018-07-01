import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageNavComponent} from './page-nav/page-nav.component';
import {HadithComponent} from './hadith/hadith.component';
import {HadithApiService} from '../services/hadith-api.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    HadithApiService,
  ],
  declarations: [
    PageNavComponent,
    HadithComponent
  ],
  exports: [
    PageNavComponent,
    HadithComponent
  ]
})
export class WidgetsModule {
}
