import { EntityRepository } from 'typeorm';
import { WOEntityRepository } from '../shared/entity';
import { Brand } from './brand.entity';

@EntityRepository(Brand)
export class BrandRepository extends WOEntityRepository<Brand> {}
