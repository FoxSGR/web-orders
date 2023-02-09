import { Injectable } from '@nestjs/common';

import { Promial, ResponseFormat } from '../shared';
import { EntityMapper } from '../shared/entity/entity.mapper';
import { IShoeSample } from './shoe-sample.types';
import { ShoeSampleDTO } from './shoe-sample.dto';
import { ShoeModel, ShoeModelService } from '../shoe-model';
import { ShoeModelMapper } from '../shoe-model/shoe-model.mapper';
import { ClientMapper } from '../client';
import { ClientService } from '../client/client.service';
import { BrandMapper, BrandService } from '../brand';
import { AgentMapper } from '../agent/agent.mapper';
import { AgentService } from '../agent';
import { IUser } from '../user';

@Injectable()
export class ShoeSampleMapper extends EntityMapper<IShoeSample, ShoeSampleDTO> {
  constructor(
    private modelService: ShoeModelService,
    private modelMapper: ShoeModelMapper,
    private clientMapper: ClientMapper,
    private clientService: ClientService,
    private agentMapper: AgentMapper,
    private agentService: AgentService,
    private brandMapper: BrandMapper,
    private brandService: BrandService,
  ) {
    super();
  }

  async bodyToEntity(body: ShoeSampleDTO, user: IUser): Promial<IShoeSample> {
    const sampleModel = await this.fieldToEntityAsync<ShoeModel>(
      this.modelMapper,
      user,
      body.sampleModel,
    );
    if (sampleModel) {
      sampleModel.type = 'sample';
    }

    return {
      baseModel: await this.find(this.modelService, user, body.baseModel?.id),
      sampleModel,
      client: await this.find(this.clientService, user, body.client?.id),
      agent: await this.find(this.agentService, user, body.agent?.id),
      brand: await this.find(this.brandService, user, body.brand?.id),
      dateAsked: body.dateAsked,
      dateDelivery: body.dateDelivery,
      deadline: body.deadline,
      size: body.size,
      amount: body.amount,
      notes: body.notes,
    };
  }

  entityToResponse(
    sample: IShoeSample,
    type?: ResponseFormat,
  ): Partial<ShoeSampleDTO> {
    return {
      ...super.entityToResponse(sample),
      baseModel: this.fieldToResponse(this.modelMapper, sample.baseModel, type),
      sampleModel: this.fieldToResponse(
        this.modelMapper,
        sample.sampleModel,
        type,
      ),
      client: this.fieldToResponse(this.clientMapper, sample.client, type),
      agent: this.fieldToResponse(this.agentMapper, sample.agent, type),
      brand: this.fieldToResponse(this.brandMapper, sample.brand, type),
      dateAsked: sample.dateAsked,
      dateDelivery: sample.dateDelivery,
      deadline: sample.deadline,
      size: sample.size,
      amount: sample.amount,
      notes: sample.notes,
    };
  }
}
