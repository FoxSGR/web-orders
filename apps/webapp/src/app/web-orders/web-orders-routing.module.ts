import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { woRoutes } from './web-orders.routes';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  ...woRoutes,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebOrdersRoutingModule {}
