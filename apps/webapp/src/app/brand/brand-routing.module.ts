import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrandComponent } from './brand.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: BrandComponent,
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('./brand.list.component').then(m => m.BrandListComponent),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list',
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class BrandRoutingModule {}
