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
import { EntityDTO } from '../shared/entity/entity.dto';
import { AddressDTO } from '../address';

export class AgentDTO extends EntityDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Type(() => String)
  phoneNumber?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  clients: ClientDTO[];

  @ApiProperty()
  @ValidateNested()
  address: AddressDTO;
}
