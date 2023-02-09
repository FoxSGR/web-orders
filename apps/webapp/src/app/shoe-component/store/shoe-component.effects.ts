import { Injectable, Injector } from '@angular/core';

import { ShoeComponent, EntityEffects } from '../../common';
import { shoeComponentStoreConfig } from './shoe-component.store';

@Injectable({ providedIn: 'root' })
export class ShoeComponentEffects extends EntityEffects<ShoeComponent> {
  constructor(injector: Injector) {
    super(injector, shoeComponentStoreConfig.name);
  }
}
