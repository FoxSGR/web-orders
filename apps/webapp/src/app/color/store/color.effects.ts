import { Injectable, Injector } from '@angular/core';

import { Color, EntityEffects } from '../../common';
import { colorStoreConfig } from './color.store';

@Injectable({ providedIn: 'root' })
export class ColorEffects extends EntityEffects<Color> {
  constructor(injector: Injector) {
    super(injector, colorStoreConfig.name);
  }
}
