import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import * as cc from './components';

const subRoutes: Routes = [
  {
    path: 'base',
    component: cc.SampleWizardBaseComponent,
  },
];

@NgModule({
  declarations: [cc.SampleWizardComponent, cc.SampleWizardBaseComponent],
  imports: [
    RouterModule.forChild([
      {
        path: ':id',
        component: cc.SampleWizardComponent,
        children: subRoutes,
      },
      {
        path: '',
        component: cc.SampleWizardComponent,
        children: subRoutes,
      },
    ]),
    IonicModule,
  ],
})
export class SampleWizardModule {}
