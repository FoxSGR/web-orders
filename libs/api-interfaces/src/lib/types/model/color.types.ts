import { IEntityDTO } from './entity.types';

export interface IColorDTO extends IEntityDTO {
  name: string;
  color: string;
}
