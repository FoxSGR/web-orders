import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { IShoeModelComponentDTO } from '@web-orders/api-interfaces';
import { EntityDTO } from '../../shared/entity/entity.dto';
import { ColorDTO } from '../../color';
import { ShoeComponentDTO } from '../../shoe-component';

export class ShoeModelComponentDTO
  extends EntityDTO
  implements IShoeModelComponentDTO
{
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  sort?: number;

  @ValidateNested()
  @Type(() => ShoeComponentDTO)
  component: ShoeComponentDTO;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  amount?: number;

  @IsNumber()
  @IsOptional()
  price?: number;

  @Type(() => ColorDTO)
  color?: ColorDTO;
}
