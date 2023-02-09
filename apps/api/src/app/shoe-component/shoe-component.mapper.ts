import { Injectable } from '@nestjs/common';

import { EntityMapper } from '../common/entity/entity.mapper';
import { IShoeComponent } from './shoe-component.types';
import { ShoeComponentDTO } from './shoe-component.dto';

@Injectable()
export class ShoeComponentMapper extends EntityMapper<
  IShoeComponent,
  ShoeComponentDTO
> {
  bodyToEntity(body: ShoeComponentDTO): Partial<IShoeComponent> {
    return {
      name: body.name,
      type: body.type,
      amount: body.amount,
      price: body.price,
      notes: body.notes,
    };
  }

  entityToResponse(component: IShoeComponent): Partial<ShoeComponentDTO> {
    return {
      ...super.entityToResponse(component),
      name: component.name,
      type: component.type,
      amount: component.amount,
      price: component.price,
      notes: component.notes,
    };
  }
}
