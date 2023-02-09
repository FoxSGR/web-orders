import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Agent } from './agent.entity';
import { EntitySeeder } from '../common/entity';
import { EntitySeederService } from '../common';

@Injectable()
@EntitySeederService()
export class AgentSeeder extends EntitySeeder<Agent> {
  constructor(@InjectRepository(Agent) repository: Repository<Agent>) {
    super(Agent, repository);
  }

  protected identifier(): keyof Agent {
    return 'name';
  }
}
