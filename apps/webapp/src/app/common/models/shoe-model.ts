import {
  APIFile,
  ComponentType,
  IShoeModelComponentDTO,
  IShoeModelDTO,
  SeasonType,
  ShoeModelType,
} from '@web-orders/api-interfaces';
import { Entity } from './entity';
import { Color } from './color';
import { ShoeComponent } from './shoe-component';

export interface ShoeModelComponentGroup {
  type: ComponentType;
  components: ShoeModelComponent[];
}

export class ShoeModelComponent
  extends Entity
  implements IShoeModelComponentDTO
{
  sort: number;
  component: ShoeComponent;
  amount?: number;
  price?: number;
  color?: Color;
}

export class ShoeModel extends Entity implements IShoeModelDTO {
  static ComponentOrder: ComponentType[] = [
    'leather',
    'lining',
    'heel',
    'last',
    'productionInsole',
    'finishInsole',
    'laces',
    'frontlet',
    'backCounter',
    'ornament',
  ];

  type: ShoeModelType;
  reference: string;
  components?: ShoeModelComponent[];
  dateCreated?: Date;
  season?: SeasonType;
  photos: APIFile[];
  notes?: string;

  constructor(model: IShoeModelDTO) {
    super(model);
    this.initChildEntities(
      model,
      new Map([['components', ShoeModelComponent]]),
    );
  }

  sortComponents() {
    this.components?.sort(
      (c1, c2) =>
        ShoeModel.ComponentOrder.indexOf(c1.component.type) -
        ShoeModel.ComponentOrder.indexOf(c2.component.type),
    );

    // Sort the photos so that the default becomes the first
    this.photos?.sort((a, b) => +(b.default || 0) - +(a.default || 0));
  }

  groupComponents(): ShoeModelComponentGroup[] {
    const groups: ShoeModelComponentGroup[] = [];

    this.components?.forEach(c => {
      let group: ShoeModelComponentGroup | undefined = groups.find(
        g => g.type === c.component.type,
      );
      if (!group) {
        group = {
          type: c.component.type,
          components: [],
        };
        groups.push(group);
      }

      group.components.push(c);
    });

    return groups.sort(
      (g1, g2) =>
        ShoeModel.ComponentOrder.indexOf(g1.type) -
        ShoeModel.ComponentOrder.indexOf(g2.type),
    );
  }
}
