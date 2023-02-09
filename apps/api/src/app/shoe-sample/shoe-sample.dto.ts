import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { IShoeSampleDTO } from '@web-orders/api-interfaces';
import { EntityDTO } from '../common/entity/entity.dto';
import { ShoeModelDTO } from '../shoe-model';
import { ClientDTO } from '../client';
import { AgentDTO } from '../agent';
import { BrandDTO } from '../brand';

export class ShoeSampleDTO extends EntityDTO implements IShoeSampleDTO {
  @ValidateNested()
  @IsOptional({ groups: ['update'] })
  @Type(() => ShoeModelDTO)
  baseModel?: ShoeModelDTO;

  @ValidateNested()
  @IsOptional({ groups: ['update'] })
  @Type(() => ShoeModelDTO)
  sampleModel?: ShoeModelDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => ClientDTO)
  client?: ClientDTO;

  @ValidateNested()
  @IsOptional()
  @Type(() => AgentDTO)
  agent?: AgentDTO;

  @ValidateNested()
  @IsOptional()
  @Type(() => BrandDTO)
  brand?: BrandDTO;

  @IsOptional()
  @Type(() => Date)
  dateAsked?: Date;

  @IsOptional()
  @Type(() => Date)
  dateDelivery?: Date;

  @IsOptional()
  @Type(() => String)
  notes?: string;
}
