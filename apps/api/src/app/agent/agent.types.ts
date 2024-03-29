import type { IEntity } from '../shared/entity';
import { IAddress } from '../address';
import { IClient } from '../client';

export interface IAgent extends IEntity {
  name: string;
  phoneNumber?: string;
  vat?: string;
  address?: IAddress;
  clients?: IClient[];
  notes?: string;
}
