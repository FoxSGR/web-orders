import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { WOCommonModule } from '../common/wo-common.module';

import * as cc from './components';

const components = [cc.ShoeModelPreviewContentComponent];

@NgModule({
  declarations: components,
  exports: [cc.ShoeModelPreviewContentComponent],
  imports: [CommonModule, TranslateModule, WOCommonModule, IonicModule],
})
export class ShoeModelModule {}
