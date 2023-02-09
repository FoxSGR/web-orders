import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { WOCommonModule } from '../../../common';

import * as cc from './components';

@NgModule({
  declarations: [
    cc.SampleWizardComponent,
    cc.SampleWizardBaseComponent,
    cc.SampleWizardModelComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: ':id',
        component: cc.SampleWizardComponent,
        children: [
          {
            path: 'base',
            component: cc.SampleWizardBaseComponent,
          },
          {
            path: 'model',
            component: cc.SampleWizardModelComponent,
          },
          {
            path: '',
            redirectTo: 'base',
            pathMatch: 'full',
          },
        ],
      },
    ]),
    IonicModule,
    WOCommonModule,
  ],
})
export class SampleWizardModule {}
