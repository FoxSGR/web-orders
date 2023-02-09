import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EntityService } from '../common/entity';
import { Color } from './color.entity';

@Injectable()
export class ColorService extends EntityService<Color> {
  constructor(@InjectRepository(Color) colorRepository: Repository<Color>) {
    super(colorRepository, { name: 'color' });
  }
}
