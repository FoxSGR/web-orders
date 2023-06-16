import { EntityRepository } from 'typeorm';

import { WOEntityRepository } from '../shared/entity';
import { ShoeComponent } from './shoe-component.entity';

@EntityRepository(ShoeComponent)
export class ShoeComponentRepository extends WOEntityRepository<ShoeComponent> {}
