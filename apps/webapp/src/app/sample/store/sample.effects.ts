import { Injectable, Injector } from '@angular/core';

import { EntityEffects, ShoeSample } from '../../common';
import { sampleStoreConfig } from './sample.store';

@Injectable({ providedIn: 'root' })
export class SampleEffects extends EntityEffects<ShoeSample> {
  constructor(injector: Injector) {
    super(injector, sampleStoreConfig.name);
  }
}
