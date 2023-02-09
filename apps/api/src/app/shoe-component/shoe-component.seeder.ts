import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShoeComponent } from './shoe-component.entity';
import { EntitySeeder } from '../common/entity';
import { EntitySeederService } from '../common';

@Injectable()
@EntitySeederService()
export class ShoeComponentSeeder extends EntitySeeder<ShoeComponent> {
  constructor(
    @InjectRepository(ShoeComponent) repository: Repository<ShoeComponent>,
  ) {
    super(ShoeComponent, repository);
  }

  protected identifier(): keyof ShoeComponent {
    return 'name';
  }
}
