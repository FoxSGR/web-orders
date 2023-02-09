import { IsArray, IsDate, IsOptional, IsString, ValidateNested } from 'class-validator';

import { APIFile, IShoeModelDTO, SeasonType } from '@web-orders/api-interfaces';
import { Type } from 'class-transformer';
import { EntityDTO } from '../shared/entity/entity.dto';
import { ShoeModelType } from './shoe-model.types';
import { ShoeModelComponentDTO } from './shoe-model-component/shoe-model-component.dto';

export class ShoeModelDTO extends EntityDTO implements IShoeModelDTO {
  @IsString()
  @IsOptional()
  @Type(() => String)
  type: ShoeModelType;

  @IsString()
  @Type(() => String)
  reference: string;

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => ShoeModelComponentDTO)
  components?: ShoeModelComponentDTO[];

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateCreated?: Date;

  @Type(() => String)
  @IsString()
  season: SeasonType;

  @Type(() => Array)
  @IsArray()
  @IsOptional()
  photos: APIFile[];

  @IsOptional()
  @Type(() => String)
  notes?: string;
}
