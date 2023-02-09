import { IAgentDTO, IBrandDTO, IClientDTO, IEntityDTO, IShoeModelDTO } from '.';

export interface IShoeSampleDTO extends IEntityDTO {
  baseModel?: IShoeModelDTO;
  sampleModel?: IShoeModelDTO;
  client?: IClientDTO;
  agent?: IAgentDTO;
  brand?: IBrandDTO;
  dateAsked?: Date;
  dateDelivery?: Date;
  notes?: string;
}
