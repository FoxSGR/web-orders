import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ColorRoutingModule } from './color-routing.module';
import { entityPersistConfig } from '../common';
import { ColorEffects, colorReducer, colorStoreConfig } from './store';
import { persistReducer } from '../common/util/persist.reducer';

import { ColorComponent } from './color.component';

@NgModule({
  declarations: [ColorComponent],
  imports: [
    CommonModule,
    IonicModule,
    ColorRoutingModule,
    StoreModule.forFeature(colorStoreConfig.name, colorReducer, {
      initialState: colorStoreConfig.initialState,
      metaReducers: [
        persistReducer(
          colorStoreConfig.initialState,
          entityPersistConfig,
          'color',
        ),
      ],
    }),
    EffectsModule.forFeature([ColorEffects]),
  ],
})
export class ColorModule {}
