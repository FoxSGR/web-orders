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
import { SampleWizardModule } from './components/sample-wizard';

import { SampleEffects, sampleReducer, sampleStoreConfig } from './store';
import { persistReducer } from '../common/util/persist.reducer';

import * as cc from './components';

const components = [cc.SamplesComponent, cc.SamplePreviewComponent];

@NgModule({
  declarations: components,
  imports: [
    RouterModule.forChild([
      {
        path: 'wizard',
        loadChildren: () =>
          import('./components/sample-wizard/sample-wizard.module').then(
            m => m.SampleWizardModule,
          ),
      },
      {
        path: 'list',
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
    SampleWizardModule,
  ],
})
export class SampleModule {}
