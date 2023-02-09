import { IClientDTO } from '@web-orders/api-interfaces';
import { Address } from './address';
import { Agent } from './agent';
import { Entity } from './entity';

export class Client extends Entity implements IClientDTO {
  name: string;
  phoneNumber?: string;
  vat?: string;
  address: Address;
  agent?: Agent;
}
