import {
  IsDate,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { EntityDTO } from '../common/entity/entity.dto';
import { ShoeSampleDTO } from '../shoe-sample';
import { ShoeSizes } from './shoe-order.types';

export class ShoeOrderDTO extends EntityDTO {
  @ValidateNested()
  @IsOptional({ groups: ['update'] })
  @Type(() => ShoeSampleDTO)
  sample: ShoeSampleDTO;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dateAsked?: Date;

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
