import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClientComponent } from './client.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ClientComponent,
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('./client.list.component').then(
                m => m.ClientListComponent,
              ),
          },
          {
            path: 'wizard',
            loadChildren: () =>
              import('./client.wizard.module').then(m => m.ClientWizardModule),
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
export class ClientRoutingModule {}
