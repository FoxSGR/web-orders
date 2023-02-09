import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { IColorDTO } from '@web-orders/api-interfaces';
import { EntityDTO } from '../shared/entity/entity.dto';

export class ColorDTO extends EntityDTO implements IColorDTO {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  color: string;
}
