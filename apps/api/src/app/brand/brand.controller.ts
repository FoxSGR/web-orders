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
import { BrandService } from './brand.service';
import { BrandMapper } from './brand.mapper';
import { IBrand } from './brand.types';
import { BrandDTO } from './brand.dto';
import { CurrentUser, FindParams, Page } from '../shared';
import { EntityController } from '../shared/entity';
import { IUser } from '../user';

@Controller('/brand')
export class BrandController extends EntityController<IBrand, BrandDTO> {
  constructor(service: BrandService, mapper: BrandMapper) {
    super();
    this.mapper = mapper;
    this.service = service;
  }

  @Get('/:id([0-9]+)')
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
  ): Promise<BrandDTO | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  public async find(
    @CurrentUser() user: IUser,
    @Query() params?: FindParams<IBrand>,
  ): Promise<Page<BrandDTO>> {
    return super.find(user, params);
  }

  @Post()
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: BrandDTO,
  ): Promise<BrandDTO> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body() body: Partial<BrandDTO>,
  ): Promise<BrandDTO> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
  ): Promise<BrandDTO> {
    return super.delete(user, id);
  }
}
