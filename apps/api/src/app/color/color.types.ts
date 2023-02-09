import type { IEntity } from '../common/entity';

export interface IColor extends IEntity {
  name: string;
  red: number;
  green: number;
  blue: number;
}
