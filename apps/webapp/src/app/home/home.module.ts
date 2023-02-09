import * as cc from './components';

import { WOCommonModule } from '../common/wo-common.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const components = [cc.HomeComponent];

@NgModule({
  declarations: components,
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: cc.HomeComponent,
      },
    ]),
    CommonModule,
    TranslateModule,
    WOCommonModule,
    IonicModule,
  ],
})
export class HomeModule {}
