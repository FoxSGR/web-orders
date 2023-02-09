import { Injectable, Injector } from '@angular/core';

import { Client, EntityEffects } from '../../common';
import { clientStoreConfig } from './client.store';

@Injectable({ providedIn: 'root' })
export class ClientEffects extends EntityEffects<Client> {
  constructor(injector: Injector) {
    super(injector, clientStoreConfig.name);
  }
}
