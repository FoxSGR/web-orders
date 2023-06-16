import { EntityRepository } from 'typeorm';

import { WOEntityRepository } from '../shared/entity';
import { Color } from './color.entity';

@EntityRepository(Color)
export class ColorRepository extends WOEntityRepository<Color> {}
