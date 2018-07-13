import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageNavComponent} from './page-nav/page-nav.component';
import {HadithComponent} from './hadith/hadith.component';
import {HadithApiService} from '../services/hadith-api.service';
import {
  EntitySelectorComponent
} from './entity-selector/entity-selector.component';
import {FormsModule} from '@angular/forms';
import {HadithTagApiService} from '../services/hadith-tag-api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    HadithApiService,
    HadithTagApiService,
  ],
  declarations: [
    EntitySelectorComponent,
    HadithComponent,
    PageNavComponent
  ],
  exports: [
    EntitySelectorComponent,
    HadithComponent,
    PageNavComponent
  ]
})
export class WidgetsModule {
}
