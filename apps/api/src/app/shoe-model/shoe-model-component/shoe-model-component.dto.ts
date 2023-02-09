import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { Id } from '../../common';

export class ShoeModelComponentDTO {
  component: Id;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  amount?: number;

  @IsNumber()
  @IsOptional()
  price?: number;

  @Type(() => Number)
  @IsOptional()
  color?: number;
}
