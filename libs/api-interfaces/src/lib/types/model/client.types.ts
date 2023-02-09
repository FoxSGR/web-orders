import { IAddressDTO } from './address.types';
import { IBrandDTO } from './brand.types';
import { IAgentDTO } from './agent.types';
import { IEntityDTO } from './entity.types';

export interface IClientDTO extends IEntityDTO {
  name: string;
  phoneNumber?: string;
  vat?: string;
  address: IAddressDTO;
  agent?: IAgentDTO;
  brands: IBrandDTO[];
}
