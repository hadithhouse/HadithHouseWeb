import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {HadithTagsComponent} from './hadith-tags.component';
import {HadithTagsRoutingModule} from './hadith-tags-routing.module';
import {CommonModule} from '@angular/common';
import {HadithTagApiService} from '../../services/hadith-tag-api.service';
import {HttpClientModule} from '@angular/common/http';
import {PageNavComponent} from '../../page-nav/page-nav.component';
import {ModalModule} from 'ngx-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {
  FbAccessTokenInterceptor,
  HTTP_INTERCEPTOR_PROVIDERS,
  LoadingStatusHttpInterceptor
} from '../../http-interceptors';

@NgModule({
  imports: [
    FontAwesomeModule,
    FormsModule,
    HadithTagsRoutingModule,
    HttpClientModule,
    CommonModule,
    BsDropdownModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
  ],
  declarations: [
    HadithTagsComponent,
    PageNavComponent
  ],
  providers: [
    HadithTagApiService,
    // Interceptor for showing/hiding loading indicator.
    LoadingStatusHttpInterceptor,
    FbAccessTokenInterceptor,
    HTTP_INTERCEPTOR_PROVIDERS
  ]
})
export class HadithTagsModule {
}
