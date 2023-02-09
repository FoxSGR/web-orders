import { IsDate, IsOptional, IsString, ValidateNested } from 'class-validator';

import { IShoeModelDTO } from '@web-orders/api-interfaces';
import { Type } from 'class-transformer';
import { EntityDTO } from '../shared/entity/entity.dto';
import { ShoeModelType } from './shoe-model.types';
import { ShoeModelComponentDTO } from './shoe-model-component/shoe-model-component.dto';
import { SeasonType } from '../shared';

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
  season: SeasonType;

  @IsOptional()
  @Type(() => String)
  notes?: string;
}
