import { IAddressDTO } from './address.types';
import { IEntityDTO } from './entity.types';
import { IClientDTO } from './client.types';

export interface IAgentDTO extends IEntityDTO {
  name: string;
  phoneNumber?: string;
  clients: IClientDTO[];
  address: IAddressDTO;
}
