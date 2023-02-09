import { Injectable } from '@nestjs/common';

import { EntityMapper } from '../shared/entity/entity.mapper';
import { IShoeComponent } from './shoe-component.types';
import { ShoeComponentDTO } from './shoe-component.dto';

@Injectable()
export class ShoeComponentMapper extends EntityMapper<
  IShoeComponent,
  ShoeComponentDTO
> {
  bodyToEntity(body: ShoeComponentDTO): Partial<IShoeComponent> {
    return {
      reference: body.reference,
      name: body.name,
      type: body.type,
      ornamentType: body.ornamentType,
      amount: body.amount,
      price: body.price,
      notes: body.notes,
    };
  }

  entityToResponse(component: IShoeComponent): Partial<ShoeComponentDTO> {
    return {
      ...super.entityToResponse(component),
      reference: component.reference,
      name: component.name,
      type: component.type,
      ornamentType: component.ornamentType,
      amount: component.amount,
      price: component.price,
      notes: component.notes,
    };
  }
}
