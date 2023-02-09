import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';

import {
  ComponentType,
  componentTypes,
  IShoeComponentDTO,
  OrnamentType,
  ornamentTypes,
} from '@web-orders/api-interfaces';
import { EntityDTO } from '../common/entity/entity.dto';

export class ShoeComponentDTO extends EntityDTO implements IShoeComponentDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional({ groups: ['update'] })
  @Type(() => String)
  reference: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Validate(type => componentTypes.includes(type))
  @IsOptional({ groups: ['update'] })
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
