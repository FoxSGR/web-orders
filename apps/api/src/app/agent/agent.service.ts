import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EntityService } from '../common/entity';
import { Agent } from './agent.entity';

@Injectable()
export class AgentService extends EntityService<Agent> {
  constructor(@InjectRepository(Agent) agentRepository: Repository<Agent>) {
    super(agentRepository, {
      name: 'agent',
      relations: ['address'],
    });
  }
}
