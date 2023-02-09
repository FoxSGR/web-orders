import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { EntityService } from '../shared/entity';
import { Brand } from './brand.entity';
import { BrandRepository } from './brand.repository';

@Injectable()
export class BrandService extends EntityService<Brand> {
  constructor(connection: Connection) {
    super(connection, BrandRepository, {
      name: 'brand',
      relations: ['clients'],
      mapping: {
        name: {
          prop: 'name',
        },
        'clients.id': {
          prop: 'clients.id',
        },
      },
    });
  }
}
