import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ColorComponent } from './color.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ColorComponent,
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('./color.list.component').then(m => m.ColorListComponent),
          },
          {
            path: 'wizard',
            loadChildren: () =>
              import('./color.wizard.module').then(m => m.ColorWizardModule),
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
export class ColorRoutingModule {}
