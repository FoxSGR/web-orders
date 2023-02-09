import { Injectable } from '@nestjs/common';
import { Connection, DeepPartial } from 'typeorm';

import { Brand } from './brand.entity';
import { EntitySeeder } from '../shared/entity';
import { EntitySeederService } from '../shared';
import { BrandRepository } from './brand.repository';
import { BrandService } from './brand.service';

@Injectable()
@EntitySeederService({ order: 200 })
export class BrandSeeder extends EntitySeeder<Brand> {
  constructor(connection: Connection, brandService: BrandService) {
    super(Brand, brandService, connection, BrandRepository);
  }

  protected identifier = () => 'name' as keyof Brand;

  protected constant(): DeepPartial<Brand>[] {
    return [
      {
        name: 'Universal Brand',
        scope: 'universal',
        base: {
          owner: { id: 1 },
        },
      },
    ];
  }
}
