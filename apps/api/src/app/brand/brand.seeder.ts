import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from './brand.entity';
import { EntitySeeder } from '../common/entity';
import { EntitySeederService } from '../common';

@Injectable()
@EntitySeederService()
export class BrandSeeder extends EntitySeeder<Brand> {
  constructor(@InjectRepository(Brand) repository: Repository<Brand>) {
    super(Brand, repository);
  }

  protected identifier = () => 'name' as keyof Brand;
}
