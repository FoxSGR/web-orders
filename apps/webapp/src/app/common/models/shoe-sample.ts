import { IShoeSampleDTO } from '@web-orders/api-interfaces';
import { ShoeModel } from './shoe-model';
import { Client } from './client';
import { Agent } from './agent';
import { Brand } from './brand';
import { Entity } from './entity';

export class ShoeSample extends Entity implements IShoeSampleDTO {
  baseModel?: ShoeModel;
  sampleModel?: ShoeModel;
  client?: Client;
  agent?: Agent;
  brand?: Brand;
  dateAsked?: Date;
  dateDelivery?: Date;
  notes?: string;
}
