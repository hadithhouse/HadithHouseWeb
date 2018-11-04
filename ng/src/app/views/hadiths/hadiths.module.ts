import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {ModalModule} from 'ngx-bootstrap';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {HadithApiService} from '../../services/hadith-api.service';
import {HadithsComponent} from './hadiths.component';
import {HadithsRoutingModule} from './hadiths-routing.module';
import {WidgetsModule} from '../../widgets/widgets.module';

@NgModule({
  imports: [
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HadithsRoutingModule,
    ModalModule.forRoot(),
    WidgetsModule
  ],
  declarations: [
    HadithsComponent,
  ],
  providers: [
    HadithApiService,
  ]
})
export class HadithsModule {
}
