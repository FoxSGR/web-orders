import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { IShoeSampleDTO } from '@web-orders/api-interfaces';
import { EntityDTO } from '../shared/entity/entity.dto';
import { ShoeModelDTO } from '../shoe-model';
import { ClientDTO } from '../client';
import { AgentDTO } from '../agent';
import { BrandDTO } from '../brand';

export class ShoeSampleDTO extends EntityDTO implements IShoeSampleDTO {
  @Type(() => ShoeModelDTO)
  baseModel?: ShoeModelDTO;

  @ValidateNested()
  @Type(() => ShoeModelDTO)
  sampleModel?: ShoeModelDTO;

  @IsOptional()
  @Type(() => ClientDTO)
  client?: ClientDTO;

  @IsOptional()
  @Type(() => AgentDTO)
  agent?: AgentDTO;

  @IsOptional()
  @Type(() => BrandDTO)
  brand?: BrandDTO;

  @IsOptional()
  @Type(() => Date)
  dateAsked?: Date;

  @IsOptional()
  @Type(() => Date)
  deadline?: Date;

  @IsOptional()
  @Type(() => Date)
  dateDelivery?: Date;

  @IsOptional()
  @Type(() => Number)
  size?: number;

  @IsOptional()
  @Type(() => Number)
  amount?: number;

  @IsOptional()
  @Type(() => String)
  notes?: string;
}
