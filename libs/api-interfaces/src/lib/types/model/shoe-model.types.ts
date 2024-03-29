import { IShoeModelComponentDTO } from './shoe-model-component.types';
import { SeasonType } from './season.types';
import { IEntityDTO } from './entity.types';
import { APIFile } from '../common';

export const shoeModelTypes = ['base', 'sample', 'order'] as const;
export type ShoeModelType = typeof shoeModelTypes[number];

export interface IShoeModelDTO extends IEntityDTO {
  type: ShoeModelType;
  reference: string;
  components?: IShoeModelComponentDTO[];
  dateCreated?: Date;
  season?: SeasonType;
  photos: APIFile[];
  notes?: string;
}
