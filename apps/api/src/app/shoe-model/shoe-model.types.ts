import type { IEntity } from '../shared/entity';
import { IPhoto, SeasonType } from '../shared';
import { IShoeModelComponent } from './shoe-model-component/shoe-model-component.types';

export const shoeModelTypes = ['base', 'sample', 'order'] as const;
export type ShoeModelType = typeof shoeModelTypes[number];

export interface IShoeModel extends IEntity {
  type: ShoeModelType;
  reference?: string;
  photos: IPhoto[];
  components: IShoeModelComponent[];
  dateCreated?: Date;
  season: SeasonType;
  notes?: string;
}
