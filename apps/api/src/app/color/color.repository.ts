import { WOEntityRepository } from '../shared/entity';
import { Color } from './color.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(Color)
export class ColorRepository extends WOEntityRepository<Color> {}
