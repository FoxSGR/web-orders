import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Agent, EntityService } from '../common';

@Injectable({ providedIn: 'root' })
export class AgentService extends EntityService<Agent> {
  constructor(http: HttpClient) {
    super(http, {
      entityClass: Agent,
      route: 'agent',
      alwaysLoadRelations: true,
    });
  }
}
