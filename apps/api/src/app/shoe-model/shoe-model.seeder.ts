import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShoeModel } from './shoe-model.entity';
import { EntitySeeder } from '../common/entity';
import { EntitySeederService } from '../common';

@Injectable()
@EntitySeederService()
export class ShoeModelSeeder extends EntitySeeder<ShoeModel> {
  nested = ['components'];

  constructor(@InjectRepository(ShoeModel) repository: Repository<ShoeModel>) {
    super(ShoeModel, repository);
  }

  protected identifier = () => 'reference' as keyof ShoeModel;
}
