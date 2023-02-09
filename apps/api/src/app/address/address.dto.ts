import { IsOptional } from 'class-validator';
import { EntityDTO } from '../common/entity/entity.dto';

export class AddressDTO extends EntityDTO {
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
