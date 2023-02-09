import { IEntity } from '../common';
import { IAddress } from '../common/address';
import { IClient } from '../client';

export interface IAgent extends IEntity {
  name: string;
  phoneNumber?: string;
  vat?: string;
  address?: IAddress;
  clients?: IClient[];
}
