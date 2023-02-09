import { WOEntityRepository } from '../shared/entity';
import { ShoeSample } from './shoe-sample.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(ShoeSample)
export class ShoeSampleRepository extends WOEntityRepository<ShoeSample> {}
