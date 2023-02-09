import type { IAddressDTO, IClientDTO, IEntityDTO } from '.';

export interface IAgentDTO extends IEntityDTO {
  name: string;
  phoneNumber?: string;
  clients: IClientDTO[];
  address: IAddressDTO;
}
