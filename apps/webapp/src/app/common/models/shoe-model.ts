import {
  IShoeModelComponentDTO,
  SeasonType,
  ShoeModelType,
} from '@web-orders/api-interfaces';
import { Entity } from './entity';
import { Color } from './color';
import { ShoeComponent } from './shoe-component';

export class ShoeModelComponent
  extends Entity
  implements IShoeModelComponentDTO
{
  component: ShoeComponent;
  amount?: number;
  price?: number;
  color?: Color;
}

export class SeasonDTO {
  year: number;
  seasons: SeasonType;
}

export class ShoeModel extends Entity {
  type: ShoeModelType;
  reference: string;
  components?: ShoeModelComponent[];
  dateCreated?: Date;
  season: SeasonDTO;
  notes?: string;
}
