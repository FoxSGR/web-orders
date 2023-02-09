import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  ColumnChangesService,
  DimensionsHelper,
  ScrollbarHelper,
} from '@swimlane/ngx-datatable';

import { AppRoutingModule } from './app-routing.module';
import { translate } from './app.translate';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { WebOrdersModule } from './web-orders/web-orders.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    TranslateModule.forRoot(translate),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot(),
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    ScrollingModule,
    WebOrdersModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      //      useFactory: (getMyLocale) // can be async
      useValue: 'pt', // if you want to hardcode it
    },
    // Start: necessary injections for ngx-datatable to work in modals
    ScrollbarHelper,
    DimensionsHelper,
    ColumnChangesService,
    // End: necessary injections for ngx-datatable to work in modals
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
