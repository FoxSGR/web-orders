import { IsOptional } from 'class-validator';

import { IAddressDTO } from '@web-orders/api-interfaces';
import { EntityDTO } from '../shared/entity/entity.dto';

export class AddressDTO extends EntityDTO implements IAddressDTO {
  @IsOptional()
  line1: string;
  @IsOptional()
  line2: string;
  @IsOptional()
  zipCode: string;
  @IsOptional()
  city: string;
  @IsOptional()
  country: string;
}
