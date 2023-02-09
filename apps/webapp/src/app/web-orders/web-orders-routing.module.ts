import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WOContainerComponent } from './components';
import { woRoutes } from './web-orders.routes';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '',
    component: WOContainerComponent,
    children: woRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebOrdersRoutingModule {}
