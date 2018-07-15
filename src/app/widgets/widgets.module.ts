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
import {AppRoutingModule} from '../app.routing';
import {AppModule} from '../app.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    // No routing in this module, but importing for routerLink directive
    RouterModule.forChild([])
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
