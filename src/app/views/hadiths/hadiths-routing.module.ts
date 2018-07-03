import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HadithsComponent} from './hadiths.component';

const routes: Routes = [
  {
    path: '',
    component: HadithsComponent,
    data: {
      title: 'Hadiths'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HadithsRoutingModule {
}
