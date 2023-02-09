import { IAgentDTO } from '@web-orders/api-interfaces';
import { Address } from './address';
import { Client } from './client';
import { Entity } from './entity';

export class Agent extends Entity implements IAgentDTO {
  name: string;
  phoneNumber?: string;
  clients: Client[];
  address: Address;
}
