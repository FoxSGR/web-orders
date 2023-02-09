import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { EntityDTO } from '../common/entity/entity.dto';

export class BrandDTO extends EntityDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional({ groups: ['update'] })
  @Type(() => String)
  name: string;
}
