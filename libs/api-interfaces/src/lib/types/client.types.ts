import type {
  IAddressDTO,
  IAgentDTO,
  IEntityDTO,
} from '@web-orders/api-interfaces';

export interface IClientDTO extends IEntityDTO {
  name: string;
  phoneNumber?: string;
  vat?: string;
  address: IAddressDTO;
  agent?: IAgentDTO;
}
