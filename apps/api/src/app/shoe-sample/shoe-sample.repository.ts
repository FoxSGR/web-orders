import { EntityRepository } from 'typeorm';

import { WOEntityRepository } from '../shared/entity';
import { ShoeSample } from './shoe-sample.entity';

@EntityRepository(ShoeSample)
export class ShoeSampleRepository extends WOEntityRepository<ShoeSample> {}
