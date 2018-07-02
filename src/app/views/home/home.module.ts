import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ButtonsModule} from 'ngx-bootstrap/buttons';

import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {WidgetsModule} from '../../widgets/widgets.module';

@NgModule({
  imports: [
    FormsModule,
    HomeRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    WidgetsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {
}
