import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SampleComponent } from './sample.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SampleComponent,
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('./sample.list.component').then(
                m => m.SampleListComponent,
              ),
          },
          {
            path: 'wizard',
            loadChildren: () =>
              import('./sample.wizard.module').then(m => m.SampleWizardModule),
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
export class SampleRoutingModule {}
