import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Import Containers
import {DefaultLayoutComponent} from './containers';

import {P404Component} from './views/error/404.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Hadith House'
    },
    children: [
      {
        path: 'home',
        loadChildren: './views/home/home.module#HomeModule'
      },
      {
        path: 'hadiths',
        loadChildren: './views/hadiths/hadiths.module#HadithsModule'
      },
      {
        path: 'hadiths/:id',
        loadChildren: './views/hadith/hadith.module#HadithModule'
      },
      {
        path: 'hadithtags',
        loadChildren: './views/hadith-tags/hadith-tags.module#HadithTagsModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
