import { IShoeSampleDTO } from '@web-orders/api-interfaces';
import { ShoeModel } from './shoe-model';
import { Client } from './client';
import { Agent } from './agent';
import { Brand } from './brand';
import { Entity } from './entity';

export class ShoeSample extends Entity implements IShoeSampleDTO {
  baseModel: ShoeModel;
  sampleModel: ShoeModel;
  client?: Client;
  agent?: Agent;
  brand?: Brand;
  dateAsked?: Date;
  deadline?: Date;
  dateDelivery?: Date;
  size?: number;
  amount?: number;
  notes?: string;

  constructor(sample: IShoeSampleDTO) {
    super(sample);
    this.initChildEntities(
      sample,
      new Map([
        ['baseModel', ShoeModel as any], // for some reason "as any" fixed the typescript error here
        ['sampleModel', ShoeModel],
        ['client', Client],
        ['agent', Agent],
        ['brand', Brand],
      ]),
    );
  }
}
