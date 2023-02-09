import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { WOCommonModule } from '../common/wo-common.module';

import { accountReducer, initialAccountState } from './store/account.reducer';
import { AccountEffects } from './store/account.effects';

import * as cc from './components';
import { persistReducer } from '../common/util/persist.reducer';

const components = [cc.LoginComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    StoreModule.forFeature('account', accountReducer, {
      initialState: initialAccountState,
      metaReducers: [
        persistReducer(initialAccountState, { user: true }, 'account'),
      ],
    }),
    EffectsModule.forFeature([AccountEffects]),
    TranslateModule,
    ReactiveFormsModule,
    WOCommonModule,
    IonicModule,
    FormsModule,
  ],
})
export class AccountModule {}
