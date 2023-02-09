import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AlertsEffects } from './store/alerts.effects';
import { alertsReducer, initialAlertsState } from './store/alerts.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('alerts', alertsReducer, {
      initialState: initialAlertsState,
    }),
    EffectsModule.forFeature([AlertsEffects]),
  ],
})
export class AlertsModule {}
