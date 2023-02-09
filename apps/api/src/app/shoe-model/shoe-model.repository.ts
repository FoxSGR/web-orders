import { WOEntityRepository } from '../shared/entity';
import { ShoeModel } from './shoe-model.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(ShoeModel)
export class ShoeModelRepository extends WOEntityRepository<ShoeModel> {}
