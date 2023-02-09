import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { EntityDTO } from '../../common/entity/entity.dto';
import { ColorDTO } from '../../color';
import { ShoeComponentDTO } from '../../shoe-component';

export class ShoeModelComponentDTO extends EntityDTO {
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
