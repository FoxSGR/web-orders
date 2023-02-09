import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { IClientDTO } from '@web-orders/api-interfaces';
import { AddressDTO } from '../address';
import { AgentDTO } from '../agent/agent.dto';
import { BrandDTO } from '../brand/brand.dto';
import { EntityDTO } from '../shared/entity/entity.dto';

export abstract class ClientDTO extends EntityDTO implements IClientDTO {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsOptional()
  @Type(() => String)
  phoneNumber?: string;

  @IsOptional()
  @Type(() => String)
  vat?: string;

  @ValidateNested()
  @Type(() => AddressDTO)
  address: AddressDTO;

  @IsOptional()
  @Type(() => AgentDTO)
  agent?: AgentDTO;

  @IsOptional()
  @Type(() => BrandDTO)
  brands: BrandDTO[];
}
