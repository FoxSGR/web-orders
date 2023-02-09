import { Injectable, Injector } from '@angular/core';

import { Brand, EntityEffects } from '../../common';
import { brandStoreConfig } from './brand.store';

@Injectable({ providedIn: 'root' })
export class BrandEffects extends EntityEffects<Brand> {
  constructor(injector: Injector) {
    super(injector, brandStoreConfig.name);
  }
}
