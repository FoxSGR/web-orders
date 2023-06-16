import { EntityRepository } from 'typeorm';

import { WOEntityRepository } from '../shared/entity';
import { ShoeModel } from './shoe-model.entity';

@EntityRepository(ShoeModel)
export class ShoeModelRepository extends WOEntityRepository<ShoeModel> {}
