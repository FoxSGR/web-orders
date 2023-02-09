import { IColorDTO, IEntityDTO, IShoeComponentDTO } from '.';

export interface IShoeModelComponentDTO extends IEntityDTO {
  component: IShoeComponentDTO;
  amount?: number;
  price?: number;
  color?: IColorDTO;
}
