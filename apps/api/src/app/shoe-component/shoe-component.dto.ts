import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ComponentType, componentTypes } from './shoe-component.types';
import { EntityDTO } from '../common/entity/entity.dto';

export class ShoeComponentDTO extends EntityDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional({ groups: ['update'] })
  @Type(() => String)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Validate((type) => componentTypes.includes(type))
  @IsOptional({ groups: ['update'] })
  @Type(() => String)
  type: ComponentType;

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
