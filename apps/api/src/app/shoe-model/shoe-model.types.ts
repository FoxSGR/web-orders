import { IEntity, IPhoto, ISeason } from '../common';
import { IShoeModelComponent } from './shoe-model-component/shoe-model-component.types';

export const shoeModelTypes = ['base', 'sample', 'order'] as const;
export type ShoeModelType = typeof shoeModelTypes[number];

export interface IShoeModel extends IEntity {
  type: ShoeModelType;

  reference?: string;

  photos: IPhoto[];

  components: IShoeModelComponent[];

  dateCreated?: Date;

  season: ISeason;

  notes?: string;
}
