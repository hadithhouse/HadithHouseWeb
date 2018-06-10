import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HadithTagsComponent} from './hadith-tags.component';

const routes: Routes = [
  {
    path: '',
    component: HadithTagsComponent,
    data: {
      title: 'Home'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HadithTagsRoutingModule {
}
