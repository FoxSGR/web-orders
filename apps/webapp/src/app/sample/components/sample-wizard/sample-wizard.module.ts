import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import * as cc from './components';

@NgModule({
  declarations: [cc.SampleWizardComponent, cc.SampleWizardBaseComponent],
  exports: [cc.SampleWizardComponent],
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
        ],
      },
    ]),
    IonicModule,
  ],
})
export class SampleWizardModule {}
