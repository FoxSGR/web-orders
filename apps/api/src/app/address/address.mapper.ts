import { Injectable } from '@nestjs/common';

import { IAddress } from './address.types';
import { AddressDTO } from './address.dto';
import { EntityMapper } from '../shared/entity/entity.mapper';

@Injectable()
export class AddressMapper extends EntityMapper<IAddress, AddressDTO> {
  bodyToEntity(body: AddressDTO): Partial<IAddress> {
    return {
      line1: body.line1,
      line2: body.line2,
      zipCode: body.zipCode,
      city: body.city,
      country: body.country,
    };
  }

  entityToResponse(input: IAddress): Partial<AddressDTO> {
    return {
      ...super.entityToResponse(input),
      line1: input.line1,
      line2: input.line2,
      zipCode: input.zipCode,
      city: input.city,
      country: input.country,
    };
  }
}
