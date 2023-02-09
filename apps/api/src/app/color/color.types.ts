import { IEntity } from '../common';

export interface IColor extends IEntity {
  name: string;
  red: number;
  green: number;
  blue: number;
}
