import { IShoeModelDTO } from './shoe-model.types';
import { IBrandDTO } from './brand.types';
import { IAgentDTO } from './agent.types';
import { IEntityDTO } from './entity.types';
import { IClientDTO } from './client.types';

export interface IShoeSampleDTO extends IEntityDTO {
  baseModel?: IShoeModelDTO;
  sampleModel?: IShoeModelDTO;
  client?: IClientDTO;
  agent?: IAgentDTO;
  brand?: IBrandDTO;
  dateAsked?: Date;
  deadline?: Date;
  dateDelivery?: Date;
  size?: number;
  amount?: number;
  notes?: string;
}
