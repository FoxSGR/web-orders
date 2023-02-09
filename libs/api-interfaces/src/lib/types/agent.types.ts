import type {
  IAddressDTO,
  IClientDTO,
  IEntityDTO,
} from '@web-orders/api-interfaces';

export interface IAgentDTO extends IEntityDTO {
  name: string;
  phoneNumber?: string;
  clients: IClientDTO[];
  address: IAddressDTO;
}
