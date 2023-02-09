import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Id } from '@web-orders/api-interfaces';
import { EntityService } from '../shared/entity';
import { ShoeModel } from './shoe-model.entity';
import { ShoeModelRepository } from './shoe-model.repository';
import { IUser } from '../user';
import { FindParams } from '../shared';
import { ShoeComponentService } from '../shoe-component';

@Injectable()
export class ShoeModelService extends EntityService<ShoeModel> {
  constructor(
    connection: Connection,
    private shoeComponentService: ShoeComponentService,
  ) {
    super(connection, ShoeModelRepository, {
      name: 'shoe_model',
      relations: ['components'],
    });
  }

  async save(
    entity: Partial<ShoeModel>,
    id?: Id,
    user?: IUser,
  ): Promise<ShoeModel> {
    // validate components
    if (entity.components) {
      const componentIds = entity.components.map(c => c.component.id);
      const components = await this.shoeComponentService.findByIds(
        { owner: user },
        componentIds,
      );

      if (!entity.components[0]?.sort) {
        const groups: { [key: string]: number } = {};
        entity.components?.forEach(modelComponent => {
          const component = components.find(
            c => c.id === modelComponent.component.id,
          );

          const index =
            groups[component.type] !== undefined
              ? groups[component.type] + 1
              : 0;
          modelComponent.sort = index;
          groups[component.type] = index;
        });
      }
    }

    return super.save(entity, id, user);
  }

  async mapFoundEntities(
    entities: ShoeModel[],
    params: FindParams<ShoeModel>,
  ): Promise<void> {
    await super.mapFoundEntities(entities, params);

    entities.forEach(entity => {
      if (entity.components) {
        entity.components.sort((a, b) => a.sort - b.sort);
      }
    });
  }
}
