import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Id } from '../common';
import { ClientDTO } from '../client/client.dto';
import { EntityDTO } from '../common/entity/entity.dto';

export class AgentDTO extends EntityDTO {
  @IsOptional()
  id: Id;

  @IsString()
  @IsNotEmpty()
  @IsOptional({ groups: ['update'] })
  @Type(() => String)
  name: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  phoneNumber?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional({ groups: ['update'] })
  clients: ClientDTO[];

  @ValidateNested()
  @IsOptional({ groups: ['update'] })
  address: AgentDTO;
}
