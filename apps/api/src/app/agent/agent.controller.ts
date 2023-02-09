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

import { AgentService } from './agent.service';
import { AgentMapper } from './agent.mapper';
import { IAgent } from './agent.types';
import { AgentDTO } from './agent.dto';
import { CurrentUser, FindParams, Id, Page } from '../common';
import { EntityController } from '../common/entity';
import { IUser } from '../user';

@Controller('/agent')
export class AgentController extends EntityController<IAgent, AgentDTO> {
  constructor(service: AgentService, mapper: AgentMapper) {
    super();
    this.mapper = mapper;
    this.service = service;
  }

  @Get('/:id([0-9]+)')
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<AgentDTO | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  public async find(
    @CurrentUser() user: IUser,
    @Query() params?: FindParams<IAgent>
  ): Promise<Page<AgentDTO>> {
    return super.find(user, params);
  }

  @Post()
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: AgentDTO
  ): Promise<AgentDTO> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body() body: Partial<AgentDTO>
  ): Promise<AgentDTO> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<AgentDTO> {
    return super.delete(user, id);
  }
}
