import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ClientDTO } from '../client/client.dto';
import { EntityDTO } from '../common/entity/entity.dto';
import { AddressDTO } from '../address';

export class AgentDTO extends EntityDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional({ groups: ['update'] })
  @Type(() => String)
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Type(() => String)
  phoneNumber?: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional({ groups: ['update'] })
  clients: ClientDTO[];

  @ApiProperty()
  @ValidateNested()
  @IsOptional({ groups: ['update'] })
  address: AddressDTO;
}
