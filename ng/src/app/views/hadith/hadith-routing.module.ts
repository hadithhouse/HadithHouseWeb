import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HadithComponent} from './hadith.component';

const routes: Routes = [
  {
    path: '',
    component: HadithComponent,
    data: {
      title: 'Hadith'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HadithRoutingModule {
}
