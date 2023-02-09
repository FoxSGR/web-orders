import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgentRoutingModule } from './agent-routing.module';
import { entityPersistConfig, WOCommonModule } from '../common';
import { AgentEffects, agentReducer, agentStoreConfig } from './store';
import { persistReducer } from '../common/util/persist.reducer';
import { AgentComponent } from './agent.component';

@NgModule({
  declarations: [AgentComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(agentStoreConfig.name, agentReducer, {
      initialState: agentStoreConfig.initialState,
      metaReducers: [
        persistReducer(
          agentStoreConfig.initialState,
          entityPersistConfig,
          'agent',
        ),
      ],
    }),
    AgentRoutingModule,
    EffectsModule.forFeature([AgentEffects]),
    TranslateModule,
    WOCommonModule,
    IonicModule,
  ],
})
export class AgentModule {}
