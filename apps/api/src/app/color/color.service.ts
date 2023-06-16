import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { EntityService } from '../shared/entity';
import { Color } from './color.entity';
import { ColorRepository } from './color.repository';

@Injectable()
export class ColorService extends EntityService<Color> {
  constructor(moduleRef: ModuleRef) {
    super(moduleRef, ColorRepository, {
      name: 'color',
      mapping: { name: { prop: 'name' } },
    });
  }
}
