import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ShoeComponentRoutingModule } from './shoe-component-routing.module';
import { entityPersistConfig } from '../common';
import {
  ShoeComponentEffects,
  shoeComponentReducer,
  shoeComponentStoreConfig,
} from './store';
import { persistReducer } from '../common/util/persist.reducer';

import { ShoeComponentComponent } from './shoe-component.component';

@NgModule({
  declarations: [ShoeComponentComponent],
  imports: [
    CommonModule,
    IonicModule,
    ShoeComponentRoutingModule,
    StoreModule.forFeature(
      shoeComponentStoreConfig.name,
      shoeComponentReducer,
      {
        initialState: shoeComponentStoreConfig.initialState,
        metaReducers: [
          persistReducer(
            shoeComponentStoreConfig.initialState,
            entityPersistConfig,
            'shoe-component',
          ),
        ],
      },
    ),
    EffectsModule.forFeature([ShoeComponentEffects]),
  ],
})
export class ShoeComponentModule {}
