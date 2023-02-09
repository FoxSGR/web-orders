import { Injectable } from '@nestjs/common';
import { EntityMapper } from '../common/entity/entity.mapper';

import { IBrand } from './brand.types';
import { BrandDTO } from './brand.dto';

@Injectable()
export class BrandMapper extends EntityMapper<IBrand, BrandDTO> {
  bodyToEntity(body: BrandDTO): Partial<IBrand> {
    return {
      name: body.name,
    };
  }

  entityToResponse(brand: IBrand): Partial<BrandDTO> {
    return {
      ...super.entityToResponse(brand),
      name: brand.name,
    };
  }
}
