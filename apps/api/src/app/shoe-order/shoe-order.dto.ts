import { IsDate, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { IShoeOrderDTO } from '@web-orders/api-interfaces';
import { EntityDTO } from '../shared/entity/entity.dto';
import { ShoeOrderSample } from './shoe-order-sample';
import { ShoeOrderSampleDTO } from './shoe-order-sample/shoe-order-sample.dto';

export class ShoeOrderDTO extends EntityDTO implements IShoeOrderDTO {
  @ValidateNested({ each: true })
  @Type(() => ShoeOrderSample)
  samples: ShoeOrderSampleDTO[];

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

  totalPairs: number;

  @IsString()
  @IsOptional()
  @Type(() => String)
  notes?: string;
}
