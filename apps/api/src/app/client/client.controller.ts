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
import { ClientService } from './client.service';
import { ClientMapper } from './client.mapper';
import { IClient } from './client.types';
import { ClientDTO } from './client.dto';
import { CurrentUser, FindParams, Page } from '../common';
import { EntityController } from '../common/entity';
import { IUser } from '../user';

@Controller('/client')
export class ClientController extends EntityController<IClient, ClientDTO> {
  constructor(service: ClientService, mapper: ClientMapper) {
    super();
    this.mapper = mapper;
    this.service = service;
  }

  @Get('/:id([0-9]+)')
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
  ): Promise<ClientDTO | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  public async find(
    @CurrentUser() user: IUser,
    @Query() params?: FindParams<IClient>,
  ): Promise<Page<ClientDTO>> {
    return super.find(user, params);
  }

  @Post()
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: ClientDTO,
  ): Promise<ClientDTO> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body() body: Partial<ClientDTO>,
  ): Promise<ClientDTO> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
  ): Promise<ClientDTO> {
    return super.delete(user, id);
  }
}
