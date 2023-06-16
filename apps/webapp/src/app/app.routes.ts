import { Routes } from '@angular/router';

import { LoginComponent } from './account';
import { WebOrdersGuard } from './web-orders/web-orders.guard';

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
    canActivate: [WebOrdersGuard],
  },
];
