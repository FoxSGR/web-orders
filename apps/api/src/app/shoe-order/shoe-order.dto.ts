import {
  IsDate,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { IShoeOrderDTO, ShoeSizes } from '@web-orders/api-interfaces';
import { EntityDTO } from '../shared/entity/entity.dto';
import { ShoeSampleDTO } from '../shoe-sample';

export class ShoeOrderDTO extends EntityDTO implements IShoeOrderDTO {
  @ValidateNested()
  @Type(() => ShoeSampleDTO)
  sample: ShoeSampleDTO;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dateAsked?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  deadline?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dateDelivery?: Date;

  @IsObject()
  @IsOptional()
  sizes?: ShoeSizes;

  @IsString()
  @IsOptional()
  @Type(() => String)
  notes?: string;
}
