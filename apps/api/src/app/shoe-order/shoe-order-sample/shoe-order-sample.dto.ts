import { IsNumber, IsObject, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { IShoeOrderSampleDTO, ShoeSizes } from '@web-orders/api-interfaces';
import { EntityDTO } from '../../shared/entity/entity.dto';
import { ShoeSampleDTO } from '../../shoe-sample';

export class ShoeOrderSampleDTO
  extends EntityDTO
  implements IShoeOrderSampleDTO
{
  @Type(() => ShoeSampleDTO)
  sample: ShoeSampleDTO;

  @IsObject()
  @IsOptional()
  sizes?: ShoeSizes;

  @IsNumber()
  @IsOptional()
  totalPairs?: number;
}
