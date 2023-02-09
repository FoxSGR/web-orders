import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { EntityEffects, ShoeSample } from '../../common';
import { SampleService } from '../sample.service';
import { sampleStoreConfig } from './sample.config';

/**
 * Account related effects.
 */
@Injectable({
  providedIn: 'root',
})
export class SampleEffects extends EntityEffects<ShoeSample> {
  constructor(store: Store, actions: Actions, sampleService: SampleService) {
    super(store, actions, sampleService, sampleStoreConfig.name);
  }
}
