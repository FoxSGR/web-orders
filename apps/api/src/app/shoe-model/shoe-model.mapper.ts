import { Injectable } from '@nestjs/common';

import { EntityMapper } from '../common/entity/entity.mapper';
import { IShoeModel } from './shoe-model.types';
import { ShoeModelDTO } from './shoe-model.dto';
import { ColorMapper, ColorService } from '../color';
import { ShoeComponentMapper, ShoeComponentService } from '../shoe-component';
import { IUser } from '../user';
import { Promial, ResponseFormat } from '../common';
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
    let modelComponents: IShoeModelComponent[];
    if (body.components) {
      const components = await this.componentService.findByIds(
        { owner: user },
        body.components.map(component => component.component.id),
      );

      const colors = await this.colorService.findByIds(
        { owner: user },
        body.components.filter(c => c.color).map(c => c.color.id),
      );

      // create the model to component link
      modelComponents = components.map(component => {
        console.log(component);
        const input = body.components.find(
          c => c.component.id === component.id,
        );
        console.log(input);
        return {
          component,
          amount: input.amount,
          price: input.price,
          color: input.color
            ? colors.find(c => c.id === input.color.id)
            : undefined,
          base: { owner: user },
        };
      });
    }

    return {
      type: 'base',
      reference: body.reference,
      components: modelComponents,
      dateCreated: body.dateCreated,
      season: body.season
        ? {
            year: body.season.year,
            seasons: body.season.seasons,
          }
        : undefined,
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
          component: this.fieldToResponse(
            this.componentMapper,
            component.component,
          ),
          amount: component.amount,
          price: component.price,
          color: this.fieldToResponse(this.colorMapper, component.color),
        })) || [];
    }

    return {
      ...super.entityToResponse(shoeModel),
      type: shoeModel.type,
      reference: shoeModel.reference,
      components,
      dateCreated: shoeModel.dateCreated,
      season: {
        year: shoeModel.season.year,
        seasons: shoeModel.season.seasons,
      },
      notes: shoeModel.notes,
    };
  }
}
