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

import { EntityController } from '../common/entity';
import { ShoeModelService } from './shoe-model.service';
import { ShoeModelMapper } from './shoe-model.mapper';
import { IShoeModel } from './shoe-model.types';
import { ShoeModelDTO } from './shoe-model.dto';
import { CurrentUser, FindParams, Id, Page } from '../common';
import { IUser } from '../user';

@Controller('/shoe-model')
export class ShoeModelController extends EntityController<
  IShoeModel,
  ShoeModelDTO
> {
  constructor(service: ShoeModelService, mapper: ShoeModelMapper) {
    super();
    this.mapper = mapper;
    this.service = service;
  }

  @Get('/:id([0-9]+)')
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeModelDTO | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  public async find(
    @CurrentUser() user: IUser,
    @Query() params?: FindParams<IShoeModel>
  ): Promise<Page<ShoeModelDTO>> {
    return super.find(user, params);
  }

  @Post()
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: ShoeModelDTO
  ): Promise<ShoeModelDTO> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body() body: Partial<ShoeModelDTO>
  ): Promise<ShoeModelDTO> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeModelDTO> {
    return super.delete(user, id);
  }
}
