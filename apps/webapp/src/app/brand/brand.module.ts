import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BrandRoutingModule } from './brand-routing.module';
import { entityPersistConfig } from '../common';
import { BrandEffects, brandReducer, brandStoreConfig } from './store';
import { persistReducer } from '../common/util/persist.reducer';

import { BrandComponent } from './brand.component';

@NgModule({
  declarations: [BrandComponent],
  imports: [
    CommonModule,
    IonicModule,
    BrandRoutingModule,
    StoreModule.forFeature(brandStoreConfig.name, brandReducer, {
      initialState: brandStoreConfig.initialState,
      metaReducers: [
        persistReducer(
          brandStoreConfig.initialState,
          entityPersistConfig,
          'brand',
        ),
      ],
    }),
    EffectsModule.forFeature([BrandEffects]),
  ],
})
export class BrandModule {}
