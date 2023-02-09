import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShoeOrderComponent } from './shoe-order.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ShoeOrderComponent,
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('./shoe-order.list.component').then(
                m => m.ShoeOrderListComponent,
              ),
          },
          {
            path: 'wizard',
            loadChildren: () =>
              import('./shoe-order.wizard.module').then(
                m => m.ShoeOrderWizardModule,
              ),
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
export class ShoeOrderRoutingModule {}
