import type { IEntity } from '../shared/entity';
import type { IShoeModel } from '../shoe-model';
import type { IClient } from '../client';
import type { IAgent } from '../agent';
import type { IBrand } from '../brand';

export interface IShoeSample extends IEntity {
  baseModel: IShoeModel;
  sampleModel: IShoeModel;
  client?: IClient;
  agent?: IAgent;
  brand?: IBrand;
  dateAsked?: Date;
  deadline?: Date;
  dateDelivery?: Date;
  size?: number;
  amount?: number;
  notes?: string;
}
