import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { IBrandDTO } from '@web-orders/api-interfaces';
import { EntityDTO } from '../common/entity/entity.dto';

export class BrandDTO extends EntityDTO implements IBrandDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional({ groups: ['update'] })
  @Type(() => String)
  name: string;
}
