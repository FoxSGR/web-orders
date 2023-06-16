import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { EntityService } from '../shared/entity';
import { Brand } from './brand.entity';
import { BrandRepository } from './brand.repository';

@Injectable()
export class BrandService extends EntityService<Brand> {
  constructor(moduleRef: ModuleRef) {
    super(moduleRef, BrandRepository, {
      name: 'brand',
      relations: [{ name: 'clients' }],
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
