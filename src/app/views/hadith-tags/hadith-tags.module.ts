import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {ModalModule} from 'ngx-bootstrap';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {HadithTagApiService} from '../../services/hadith-tag-api.service';
import {HadithTagsComponent} from './hadith-tags.component';
import {HadithTagsRoutingModule} from './hadith-tags-routing.module';
import {WidgetsModule} from '../../widgets/widgets.module';

@NgModule({
  imports: [
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HadithTagsRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    WidgetsModule
  ],
  declarations: [
    HadithTagsComponent,
  ],
  providers: [
    HadithTagApiService,
  ]
})
export class HadithTagsModule {
}
