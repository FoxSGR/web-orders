import { Routes } from '@angular/router';

import { LoginComponent } from './account';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('./web-orders/web-orders.module').then(m => m.WebOrdersModule),
  },
];
