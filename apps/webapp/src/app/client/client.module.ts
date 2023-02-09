import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ClientRoutingModule } from './client-routing.module';
import { entityPersistConfig } from '../common';
import { ClientEffects, clientReducer, clientStoreConfig } from './store';
import { persistReducer } from '../common/util/persist.reducer';

import { ClientComponent } from './client.component';

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    IonicModule,
    ClientRoutingModule,
    StoreModule.forFeature(clientStoreConfig.name, clientReducer, {
      initialState: clientStoreConfig.initialState,
      metaReducers: [
        persistReducer(
          clientStoreConfig.initialState,
          entityPersistConfig,
          'client',
        ),
      ],
    }),
    EffectsModule.forFeature([ClientEffects]),
  ],
})
export class ClientModule {}
