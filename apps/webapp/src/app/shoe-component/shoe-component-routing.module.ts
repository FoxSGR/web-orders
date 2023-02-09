import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShoeComponentComponent } from './shoe-component.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ShoeComponentComponent,
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('./shoe-component.list.component').then(
                m => m.ShoeComponentListComponent,
              ),
          },
          {
            path: 'wizard',
            loadChildren: () =>
              import('./shoe-component.wizard.module').then(
                m => m.ShoeComponentWizardModule,
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
export class ShoeComponentRoutingModule {}
