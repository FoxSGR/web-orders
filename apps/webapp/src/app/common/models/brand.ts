import { BrandScope, IBrandDTO } from '@web-orders/api-interfaces';
import { Entity } from './entity';

export class Brand extends Entity implements IBrandDTO {
  name: string;
  scope: BrandScope;
}
