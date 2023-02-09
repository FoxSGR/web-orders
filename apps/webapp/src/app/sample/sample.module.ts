import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { WOCommonModule } from '../common/wo-common.module';

import { SampleEffects, sampleReducer, sampleStoreConfig } from './store';
import { persistReducer } from '../common/util/persist.reducer';

import * as cc from './components';
import { EffectsModule } from '@ngrx/effects';

const components = [cc.SamplesComponent, cc.SampleListComponent];

@NgModule({
  declarations: components,
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: cc.SamplesComponent,
      },
    ]),
    CommonModule,
    StoreModule.forFeature(sampleStoreConfig.name, sampleReducer, {
      initialState: sampleStoreConfig.initialState,
      metaReducers: [
        persistReducer(sampleStoreConfig.initialState, {
          loaded: true,
          page: true,
        }),
      ],
    }),
    EffectsModule.forFeature([SampleEffects]),
    TranslateModule,
    WOCommonModule,
    IonicModule,
    NgxDatatableModule,
  ],
})
export class SampleModule {}
