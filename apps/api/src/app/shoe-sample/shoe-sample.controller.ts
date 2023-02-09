import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { Id } from '@web-orders/api-interfaces';
import { ShoeSampleService } from './shoe-sample.service';
import { ShoeSampleMapper } from './shoe-sample.mapper';
import { IShoeSample } from './shoe-sample.types';
import { ShoeSampleDTO } from './shoe-sample.dto';
import { CurrentUser, FindParams, Page } from '../common';
import { EntityController } from '../common/entity';
import { IUser } from '../user';
import { ClientMapper } from '../client';

@Controller('/shoe-sample')
export class ShoeSampleController extends EntityController<
  IShoeSample,
  ShoeSampleDTO,
  ShoeSampleService
> {
  constructor(
    service: ShoeSampleService,
    mapper: ShoeSampleMapper,
    private clientMapper: ClientMapper,
  ) {
    super();
    this.mapper = mapper;
    this.service = service;
  }

  @Get('/:id([0-9]+)')
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
  ): Promise<ShoeSampleDTO | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  public async find(
    @CurrentUser() user: IUser,
    @Query() params?: FindParams<IShoeSample>,
  ): Promise<Page<ShoeSampleDTO>> {
    return super.find(user, params);
  }

  @Post()
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: ShoeSampleDTO,
  ): Promise<ShoeSampleDTO> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body() body: Partial<ShoeSampleDTO>,
  ): Promise<ShoeSampleDTO> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
  ): Promise<ShoeSampleDTO> {
    return super.delete(user, id);
  }

  @Get('/top/clients')
  public async top(
    @CurrentUser() user: IUser,
    @Query() params?: FindParams<IShoeSample>,
  ) {
    if (params.filter) {
      params.filter = JSON.parse(params.filter as any);
    }

    const data = await this.service.topClients(params, user);
    return {
      items: data.map(client => this.clientMapper.entityToResponse(client)),
    };
  }
}
