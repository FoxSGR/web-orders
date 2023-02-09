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
import { ShoeOrderService } from './shoe-order.service';
import { ShoeOrderMapper } from './shoe-order.mapper';
import { IShoeOrder } from './shoe-order.types';
import { ShoeOrderDTO } from './shoe-order.dto';
import { CurrentUser, FindParams, Page } from '../common';
import { EntityController } from '../common/entity';
import { IUser } from '../user';

@Controller('/shoe-order')
export class ShoeOrderController extends EntityController<
  IShoeOrder,
  ShoeOrderDTO
> {
  constructor(service: ShoeOrderService, mapper: ShoeOrderMapper) {
    super();
    this.mapper = mapper;
    this.service = service;
  }

  @Get('/:id([0-9]+)')
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeOrderDTO | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  public async find(
    @CurrentUser() user: IUser,
    @Query() params?: FindParams<IShoeOrder>
  ): Promise<Page<ShoeOrderDTO>> {
    return super.find(user, params);
  }

  @Post()
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: ShoeOrderDTO
  ): Promise<ShoeOrderDTO> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body() body: Partial<ShoeOrderDTO>
  ): Promise<ShoeOrderDTO> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeOrderDTO> {
    return super.delete(user, id);
  }
}
