import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageNavComponent} from './page-nav/page-nav.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PageNavComponent],
  exports: [PageNavComponent]
})
export class WidgetsModule {
}
