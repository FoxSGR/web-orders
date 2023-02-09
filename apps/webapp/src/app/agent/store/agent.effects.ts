import { Injectable, Injector } from '@angular/core';

import { Agent, EntityEffects } from '../../common';
import { agentStoreConfig } from './agent.store';

@Injectable({ providedIn: 'root' })
export class AgentEffects extends EntityEffects<Agent> {
  constructor(injector: Injector) {
    super(injector, agentStoreConfig.name);
  }
}
