import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Id } from '../common';

export class ColorDTO {
  @IsOptional()
  id: Id;

  @IsNotEmpty()
  @IsString()
  @IsOptional({ groups: ['update'] })
  @Type(() => String)
  name: string;

  @IsInt()
  @Min(0)
  @Max(255)
  @IsOptional()
  @Type(() => Number)
  red: number;

  @IsInt()
  @Min(0)
  @Max(255)
  @IsOptional()
  @Type(() => Number)
  green: number;

  @IsInt()
  @Min(0)
  @Max(255)
  @IsOptional()
  @Type(() => Number)
  blue: number;
}
