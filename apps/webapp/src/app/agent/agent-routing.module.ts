import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AgentComponent } from './agent.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AgentComponent,
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('./agent.list.component').then(m => m.AgentListComponent),
          },
          {
            path: 'wizard',
            loadChildren: () =>
              import('./agent.wizard.module').then(m => m.AgentWizardModule),
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
export class AgentRoutingModule {}
