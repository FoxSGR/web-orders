import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { EntityService } from '../shared/entity';
import { Color } from './color.entity';
import { ColorRepository } from './color.repository';

@Injectable()
export class ColorService extends EntityService<Color> {
  constructor(connection: Connection) {
    super(connection, ColorRepository, {
      name: 'color',
      mapping: { name: { prop: 'name' } },
    });
  }
}
