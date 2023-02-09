import { Injectable, Injector } from '@angular/core';

import { EntityEffects, ShoeOrder } from '../../common';
import { shoeOrderStoreConfig } from './shoe-order.store';

@Injectable({ providedIn: 'root' })
export class ShoeOrderEffects extends EntityEffects<ShoeOrder> {
  constructor(injector: Injector) {
    super(injector, shoeOrderStoreConfig.name);
  }
}
