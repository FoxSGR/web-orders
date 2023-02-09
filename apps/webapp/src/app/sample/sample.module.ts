import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { WOCommonModule } from '../common';
import { SampleListModule } from './components/sample-list';

import { SampleEffects, sampleReducer, sampleStoreConfig } from './store';
import { persistReducer } from '../common/util/persist.reducer';

import * as cc from './components';

const components = [
  cc.SamplesComponent,
  cc.SamplePreviewComponent,
];

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
    FormsModule,
    StoreModule.forFeature(sampleStoreConfig.name, sampleReducer, {
      initialState: sampleStoreConfig.initialState,
      metaReducers: [
        persistReducer(sampleStoreConfig.initialState, {
          loaded: true,
          page: true,
          filter: false,
          status: false,
        }),
      ],
    }),
    EffectsModule.forFeature([SampleEffects]),
    SampleListModule,
    TranslateModule,
    WOCommonModule,
    IonicModule,
  ],
})
export class SampleModule {}
