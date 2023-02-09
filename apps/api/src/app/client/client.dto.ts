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
import { EntityDTO } from '../common/entity/entity.dto';

export abstract class ClientDTO extends EntityDTO implements IClientDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional({ groups: ['update'] })
  @Type(() => String)
  name: string;

  @IsOptional()
  @Type(() => String)
  phoneNumber?: string;

  @IsOptional()
  @Type(() => String)
  vat?: string;

  @ValidateNested()
  @IsOptional({ groups: ['update'] })
  @Type(() => AddressDTO)
  address: AddressDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => AgentDTO)
  agent?: AgentDTO;
}
