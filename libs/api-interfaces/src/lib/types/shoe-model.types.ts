import type { IEntityDTO, ISeasonDTO, IShoeModelComponentDTO } from '.';

export const shoeModelTypes = ['base', 'sample', 'order'] as const;
export type ShoeModelType = typeof shoeModelTypes[number];

export interface IShoeModelDTO extends IEntityDTO {
  type: ShoeModelType;
  reference: string;
  components?: IShoeModelComponentDTO[];
  dateCreated?: Date;
  season: ISeasonDTO;
  notes?: string;
}
