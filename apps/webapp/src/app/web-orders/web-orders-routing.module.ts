import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WOTabsComponent } from './components';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '',
    component: WOTabsComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'sample',
        loadChildren: () =>
          import('../sample/sample.module').then(m => m.SampleModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebOrdersRoutingModule {}
