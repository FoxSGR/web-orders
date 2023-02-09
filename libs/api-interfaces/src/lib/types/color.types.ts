import { IEntityDTO } from './entity.types';

export interface IColorDTO extends IEntityDTO {
  name: string;
  red: number;
  green: number;
  blue: number;
}
