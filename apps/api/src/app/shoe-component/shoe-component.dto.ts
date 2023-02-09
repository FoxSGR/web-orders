import { IsNumber, IsOptional, IsString, Min, Validate } from 'class-validator';
import { Type } from 'class-transformer';

import {
  ComponentType,
  componentTypes,
  IShoeComponentDTO,
  OrnamentType,
  ornamentTypes,
} from '@web-orders/api-interfaces';
import { EntityDTO } from '../shared/entity/entity.dto';

export class ShoeComponentDTO extends EntityDTO implements IShoeComponentDTO {
  @IsString()
  @IsOptional()
  @Type(() => String)
  reference: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  name: string;

  @IsString()
  @IsOptional()
  @Validate(type => componentTypes.includes(type))
  @Type(() => String)
  type: ComponentType;

  @IsString()
  @Validate(type => ornamentTypes.includes(type))
  @IsOptional()
  @Type(() => String)
  ornamentType: OrnamentType;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  amount?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  price?: number;

  @IsString()
  @IsOptional()
  @Type(() => String)
  notes?: string;
}
