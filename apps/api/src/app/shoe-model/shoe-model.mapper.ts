import { Injectable } from '@nestjs/common';

import { IShoeModelComponentDTO } from '@web-orders/api-interfaces';
import { EntityMapper } from '../shared/entity/entity.mapper';
import { IShoeModel } from './shoe-model.types';
import { ShoeModelDTO } from './shoe-model.dto';
import { ColorMapper, ColorService } from '../color';
import { ShoeComponentMapper, ShoeComponentService } from '../shoe-component';
import { IUser } from '../user';
import { Promial, ResponseFormat } from '../shared';
import { IShoeModelComponent } from './shoe-model-component/shoe-model-component.types';
import { ShoeModelComponentDTO } from './shoe-model-component/shoe-model-component.dto';

@Injectable()
export class ShoeModelMapper extends EntityMapper<IShoeModel, ShoeModelDTO> {
  constructor(
    private colorMapper: ColorMapper,
    private colorService: ColorService,
    private componentMapper: ShoeComponentMapper,
    private componentService: ShoeComponentService,
  ) {
    super();
  }

  async bodyToEntity(
    body: Partial<ShoeModelDTO>,
    user: IUser,
  ): Promial<IShoeModel> {
    return {
      type: 'base',
      reference: body.reference,
      components: await this.mapComponentsToEntities(body.components, user),
      dateCreated: body.dateCreated,
      season: body.season,
      photos: body.photos,
      notes: body.notes,
      base: {
        owner: user,
      },
    };
  }

  entityToResponse(
    shoeModel: IShoeModel,
    type?: ResponseFormat,
  ): Partial<ShoeModelDTO> {
    let components: ShoeModelComponentDTO[] = undefined;
    if (type === 'full') {
      components =
        shoeModel.components?.map(component => ({
          sort: component.sort,
          component: this.fieldToResponse(
            this.componentMapper,
            component.component,
          ),
          amount: component.amount,
          price: component.price,
          color: this.fieldToResponse(this.colorMapper, component.color),
          notes: component.notes,
        })) || [];
    }

    return {
      ...super.entityToResponse(shoeModel),
      type: shoeModel.type,
      reference: shoeModel.reference,
      components,
      dateCreated: shoeModel.dateCreated,
      season: shoeModel.season,
      photos: shoeModel.photos,
      notes: shoeModel.notes,
    };
  }

  private async mapComponentsToEntities(
    bodyComponents: IShoeModelComponentDTO[] | undefined,
    user: IUser,
  ): Promise<IShoeModelComponent[]> {
    if (!bodyComponents) {
      return undefined;
    }

    const components = await this.componentService.findByIds(
      { owner: user },
      bodyComponents.map(component => component.component.id),
    );

    const colors = await this.colorService.findByIds(
      { owner: user },
      bodyComponents.filter(c => c.color).map(c => c.color.id),
    );

    // create the model to component link
    return components.map(component => {
      const input = bodyComponents.find(c => c.component.id === component.id);

      return {
        component,
        sort: input.sort,
        amount: input.amount,
        price: input.price,
        color: input.color
          ? colors.find(c => c.id === input.color.id)
          : undefined,
        notes: input.notes,
        base: { owner: user },
      };
    });
  }
}
