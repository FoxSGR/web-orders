import { Entity } from './entity';
import { IBrandDTO } from '@web-orders/api-interfaces';

export class Brand extends Entity implements IBrandDTO {
  name: string;
}
