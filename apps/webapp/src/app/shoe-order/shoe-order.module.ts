import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ShoeOrderRoutingModule } from './shoe-order-routing.module';

import { entityPersistConfig } from '../common';
import {
  ShoeOrderEffects,
  shoeOrderReducer,
  shoeOrderStoreConfig,
} from './store';
import { persistReducer } from '../common/util/persist.reducer';

import { ShoeOrderComponent } from './shoe-order.component';

@NgModule({
  declarations: [ShoeOrderComponent],
  imports: [
    CommonModule,
    IonicModule,
    ShoeOrderRoutingModule,
    StoreModule.forFeature(shoeOrderStoreConfig.name, shoeOrderReducer, {
      initialState: shoeOrderStoreConfig.initialState,
      metaReducers: [
        persistReducer(
          shoeOrderStoreConfig.initialState,
          entityPersistConfig,
          'shoe-order',
        ),
      ],
    }),
    EffectsModule.forFeature([ShoeOrderEffects]),
  ],
})
export class ShoeOrderModule {}
