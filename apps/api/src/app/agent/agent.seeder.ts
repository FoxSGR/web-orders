import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Agent } from './agent.entity';
import { AgentRepository } from './agent.repository';
import { AgentService } from './agent.service';
import { EntitySeeder } from '../shared/entity';
import { EntitySeederService } from '../shared';

@Injectable()
@EntitySeederService({ order: 100 })
export class AgentSeeder extends EntitySeeder<Agent> {
  constructor(connection: Connection, agentService: AgentService) {
    super(Agent, agentService, connection, AgentRepository);
  }

  protected identifier(): keyof Agent {
    return 'name';
  }
}
