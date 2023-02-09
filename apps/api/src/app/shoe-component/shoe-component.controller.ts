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
import { EntityController } from '../common/entity';
import { ShoeComponentService } from './shoe-component.service';
import { ShoeComponentMapper } from './shoe-component.mapper';
import { IShoeComponent } from './shoe-component.types';
import { ShoeComponentDTO } from './shoe-component.dto';
import { CurrentUser, FindParams, Page } from '../common';
import { IUser } from '../user';

@Controller('/shoe-component')
export class ShoeComponentController extends EntityController<
  IShoeComponent,
  ShoeComponentDTO
> {
  constructor(service: ShoeComponentService, mapper: ShoeComponentMapper) {
    super();
    this.mapper = mapper;
    this.service = service;
  }

  @Get('/:id([0-9]+)')
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeComponentDTO | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  public async find(
    @CurrentUser() user: IUser,
    @Query() params?: FindParams<IShoeComponent>
  ): Promise<Page<ShoeComponentDTO>> {
    return super.find(user, params);
  }

  @Post()
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: ShoeComponentDTO
  ): Promise<ShoeComponentDTO> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body() body: Partial<ShoeComponentDTO>
  ): Promise<ShoeComponentDTO> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeComponentDTO> {
    return super.delete(user, id);
  }
}
