import { IColorDTO } from '@web-orders/api-interfaces';
import { Entity } from './entity';

export class Color extends Entity implements IColorDTO {
  name: string;
  red: number;
  green: number;
  blue: number;
}
