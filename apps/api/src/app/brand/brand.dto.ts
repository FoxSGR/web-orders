import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { BrandScope, brandScopes, IBrandDTO } from '@web-orders/api-interfaces';
import { EntityDTO } from '../shared/entity/entity.dto';

export class BrandDTO extends EntityDTO implements IBrandDTO {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsIn(brandScopes)
  @IsNotEmpty()
  @IsOptional()
  @Type(() => String)
  scope: BrandScope;

  @IsString()
  @IsOptional()
  @Type(() => String)
  notes?: string;
}
