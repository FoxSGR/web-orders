import type { IEntity } from '../shared/entity';
import { IAddress } from '../address';
import { IAgent } from '../agent/agent.types';
import { IBrand } from '../brand/brand.types';

export interface IClient extends IEntity {
  name: string;
  phoneNumber?: string;
  vat?: string;
  address: IAddress;
  agent?: IAgent;
  brands: IBrand[];
  notes?: string;
}
