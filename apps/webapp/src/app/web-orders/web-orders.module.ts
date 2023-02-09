import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { WOCommonModule } from '../common/wo-common.module';
import { AccountModule } from '../account';
import { AlertsModule } from '../alerts';
import { SampleModule } from '../sample';
import { WebOrdersRoutingModule } from './web-orders-routing.module';

import { WebOrdersInterceptor } from './web-orders.interceptor';

import * as cc from './components';

const components = [cc.WOContainerComponent, cc.WOMainComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule,
    HttpClientModule,

    WebOrdersRoutingModule,
    AccountModule,
    AlertsModule,
    SampleModule,
    WOCommonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebOrdersInterceptor, multi: true },
  ],
})
export class WebOrdersModule {}
