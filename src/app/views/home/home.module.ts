import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    FormsModule,
    HomeRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ HomeComponent ]
})
export class HomeModule { }
