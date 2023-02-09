import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';

import { ISeasonDTO, IShoeModelDTO } from '@web-orders/api-interfaces';
import { Type } from 'class-transformer';
import { EntityDTO } from '../common/entity/entity.dto';
import { ShoeModelType } from './shoe-model.types';
import { ShoeModelComponentDTO } from './shoe-model-component/shoe-model-component.dto';
import { SeasonType, seasonTypes } from '../common';

export class SeasonDTO implements ISeasonDTO {
  @IsNotEmpty()
  @IsInt()
  @Min(1900)
  @Type(() => Number)
  year: number;

  @IsNotEmpty()
  @Validate(season => !!seasonTypes[season])
  @Type(() => String)
  seasons: SeasonType;
}

export class ShoeModelDTO extends EntityDTO implements IShoeModelDTO {
  @IsString()
  @IsOptional()
  @Type(() => String)
  type: ShoeModelType;

  @IsString()
  @Type(() => String)
  @IsOptional({ groups: ['update'] })
  reference: string;

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => ShoeModelComponentDTO)
  components?: ShoeModelComponentDTO[];

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateCreated?: Date;

  @ValidateNested()
  @IsOptional({ groups: ['update'] })
  @Type(() => SeasonDTO)
  season: SeasonDTO;

  @IsOptional()
  @Type(() => String)
  notes?: string;
}
