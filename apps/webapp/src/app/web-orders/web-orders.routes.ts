import { Routes } from '@angular/router';

export const woRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'sample',
    loadChildren: () =>
      import('../sample/sample.module').then(m => m.SampleModule),
  },
  {
    path: 'client',
    loadChildren: () =>
      import('../client/client.module').then(m => m.ClientModule),
  },
  {
    path: 'agent',
    loadChildren: () =>
      import('../agent/agent.module').then(m => m.AgentModule),
  },
  {
    path: 'brand',
    loadChildren: () =>
      import('../brand/brand.module').then(m => m.BrandModule),
  },
  {
    path: 'color',
    loadChildren: () =>
      import('../color/color.module').then(m => m.ColorModule),
  },
  {
    path: 'shoe-component',
    loadChildren: () =>
      import('../shoe-component/shoe-component.module').then(
        m => m.ShoeComponentModule,
      ),
  },
  {
    path: 'shoe-order',
    loadChildren: () =>
      import('../shoe-order/shoe-order.module').then(m => m.ShoeOrderModule),
  },
];
