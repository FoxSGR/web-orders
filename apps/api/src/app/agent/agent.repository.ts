import { EntityRepository } from 'typeorm';

import { WOEntityRepository } from '../shared/entity';
import { Agent } from './agent.entity';

@EntityRepository(Agent)
export class AgentRepository extends WOEntityRepository<Agent> {}
