import { Routes } from '@angular/router';

import { LoginComponent } from './account';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'entity-preview',
    loadChildren: () =>
      import('./common/components/entity-preview/entity-preview.module').then(
        m => m.EntityPreviewModule,
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./web-orders/web-orders.module').then(m => m.WebOrdersModule),
  },
];
