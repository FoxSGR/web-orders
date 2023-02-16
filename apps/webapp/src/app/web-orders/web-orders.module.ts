import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { AccountModule } from '../account';

import { WebOrdersRoutingModule } from './web-orders-routing.module';
import { WebOrdersInterceptor } from './web-orders.interceptor';
import { WOMainComponent } from './components';

import './autoload';

@NgModule({
  declarations: [WOMainComponent],
  exports: [WOMainComponent],
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule,

    WebOrdersRoutingModule,

    AccountModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebOrdersInterceptor, multi: true },
  ],
})
export class WebOrdersModule {}
