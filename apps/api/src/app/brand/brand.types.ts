import { BrandScope } from '@web-orders/api-interfaces';
import type { IEntity } from '../shared/entity';
import { IClient } from '../client/client.types';

export interface IBrand extends IEntity {
  name: string;
  scope: BrandScope;
  notes?: string;
  clients: IClient[];
}
