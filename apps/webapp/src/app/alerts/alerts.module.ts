import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AlertsEffects } from './store/alerts.effects';
import { alertsReducer, initialAlertsState } from './store/alerts.reducer';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forFeature('alerts', alertsReducer, {
      initialState: initialAlertsState,
    }),
    EffectsModule.forFeature([AlertsEffects]),
  ],
})
export class AlertsModule {}
