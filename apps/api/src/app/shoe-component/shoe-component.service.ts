import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { EntityService } from '../shared/entity';
import { ShoeComponent } from './shoe-component.entity';
import { ShoeComponentRepository } from './shoe-component.repository';

@Injectable()
export class ShoeComponentService extends EntityService<ShoeComponent> {
  constructor(moduleRef: ModuleRef) {
    super(moduleRef, ShoeComponentRepository, {
      name: 'shoe_component',
      mapping: {
        name: {
          prop: 'name',
        },
        reference: {
          prop: 'reference',
        },
        notes: {
          prop: 'notes',
        },
        type: {
          prop: 'type',
        },
        ornamentType: {
          prop: 'ornamentType',
        },
      },
    });
  }
}
