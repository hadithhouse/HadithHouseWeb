import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {HadithTagsComponent} from './hadith-tags.component';
import {HadithTagsRoutingModule} from './hadith-tags-routing.module';
import {CommonModule} from '@angular/common';
import {HadithTagApiService} from '../../services/hadith-tag-api.service';
import {AuthService} from '../../services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {PageNavComponent} from '../../page-nav/page-nav.component';

@NgModule({
  imports: [
    FormsModule,
    HadithTagsRoutingModule,
    HttpClientModule,
    CommonModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
  ],
  declarations: [
    HadithTagsComponent,
    PageNavComponent
  ],
  providers: [
    HadithTagApiService,
    AuthService
  ]
})
export class HadithTagsModule {
}
