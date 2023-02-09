import type { IEntity } from '../common/entity';
import { IAddress } from '../address';
import { IAgent } from '../agent/agent.types';

export interface IClient extends IEntity {
  name: string;
  phoneNumber?: string;
  vat?: string;
  address: IAddress;
  agent?: IAgent;
  notes?: string;
}
