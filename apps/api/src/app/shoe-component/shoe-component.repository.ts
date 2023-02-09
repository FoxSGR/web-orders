import { WOEntityRepository } from '../shared/entity';
import { ShoeComponent } from './shoe-component.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(ShoeComponent)
export class ShoeComponentRepository extends WOEntityRepository<ShoeComponent> {}
