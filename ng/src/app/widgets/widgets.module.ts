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
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule} from '@angular/router';
import {EntityLabelComponent} from './entity-label/entity-label.component';
import {BookApiService} from '../services/book-api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    // No routing in this module, but importing for routerLink directive
    RouterModule.forChild([])
  ],
  providers: [
    BookApiService,
    HadithApiService,
    HadithTagApiService,
  ],
  declarations: [
    EntityLabelComponent,
    EntitySelectorComponent,
    HadithComponent,
    PageNavComponent
  ],
  exports: [
    EntityLabelComponent,
    EntitySelectorComponent,
    HadithComponent,
    PageNavComponent
  ]
})
export class WidgetsModule {
}
