import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { EntityService } from '../shared/entity';
import { ShoeComponent } from './shoe-component.entity';
import { ShoeComponentRepository } from './shoe-component.repository';

@Injectable()
export class ShoeComponentService extends EntityService<ShoeComponent> {
  constructor(connection: Connection) {
    super(connection, ShoeComponentRepository, {
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
