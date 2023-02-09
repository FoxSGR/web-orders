import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EntityService } from '../common/entity';
import { Brand } from './brand.entity';

@Injectable()
export class BrandService extends EntityService<Brand> {
  constructor(@InjectRepository(Brand) brandRepository: Repository<Brand>) {
    super(brandRepository, {
      name: 'brand',
    });
  }
}
