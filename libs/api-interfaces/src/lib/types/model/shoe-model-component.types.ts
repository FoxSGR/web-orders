import { IShoeComponentDTO } from './shoe-component.types';
import { IColorDTO } from './color.types';
import { IEntityDTO } from './entity.types';

export interface IShoeModelComponentDTO extends IEntityDTO {
  sort?: number;
  component: IShoeComponentDTO;
  amount?: number;
  price?: number;
  color?: IColorDTO;
  notes?: string;
}
