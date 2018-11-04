import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {ModalModule} from 'ngx-bootstrap';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {HadithApiService} from '../../services/hadith-api.service';
import {HadithComponent} from './hadith.component';
import {HadithRoutingModule} from './hadith-routing.module';
import {WidgetsModule} from '../../widgets/widgets.module';

@NgModule({
  imports: [
    ButtonsModule.forRoot(),
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HadithRoutingModule,
    ModalModule.forRoot(),
    WidgetsModule
  ],
  declarations: [
    HadithComponent,
  ],
  providers: [
    HadithApiService,
  ]
})
export class HadithModule {
}
