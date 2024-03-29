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
import { EntityController } from '../shared/entity';
import { ColorService } from './color.service';
import { ColorMapper } from './color.mapper';
import { IColor } from './color.types';
import { ColorDTO } from './color.dto';
import { CurrentUser, FindParams, Page } from '../shared';
import { IUser } from '../user';

@Controller('/color')
export class ColorController extends EntityController<IColor, ColorDTO> {
  constructor(service: ColorService, mapper: ColorMapper) {
    super();
    this.mapper = mapper;
    this.service = service;
  }

  @Get('/:id([0-9]+)')
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
  ): Promise<ColorDTO | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  public async find(
    @CurrentUser() user: IUser,
    @Query() params?: FindParams<IColor>,
  ): Promise<Page<ColorDTO>> {
    return super.find(user, params);
  }

  @Post()
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: ColorDTO,
  ): Promise<ColorDTO> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body() body: Partial<ColorDTO>,
  ): Promise<ColorDTO> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
  ): Promise<ColorDTO> {
    return super.delete(user, id);
  }
}
