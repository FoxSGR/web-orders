import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SampleRoutingModule } from './sample-routing.module';

import { entityPersistConfig } from '../common';
import { SampleEffects, sampleReducer, sampleStoreConfig } from './store';
import { persistReducer } from '../common/util/persist.reducer';

import { SampleComponent } from './sample.component';

@NgModule({
  declarations: [SampleComponent],
  imports: [
    CommonModule,
    IonicModule,
    SampleRoutingModule,
    StoreModule.forFeature(sampleStoreConfig.name, sampleReducer, {
      initialState: sampleStoreConfig.initialState,
      metaReducers: [
        persistReducer(
          sampleStoreConfig.initialState,
          entityPersistConfig,
          'sample',
        ),
      ],
    }),
    EffectsModule.forFeature([SampleEffects]),
  ],
})
export class SampleModule {}
