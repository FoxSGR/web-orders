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

import { ShoeSampleService } from './shoe-sample.service';
import { ShoeSampleMapper } from './shoe-sample.mapper';
import { IShoeSample } from './shoe-sample.types';
import { ShoeSampleDTO } from './shoe-sample.dto';
import { CurrentUser, FindParams, Id, Page } from '../common';
import { EntityController } from '../common/entity';
import { IUser } from '../user';

@Controller('/shoe-sample')
export class ShoeSampleController extends EntityController<
  IShoeSample,
  ShoeSampleDTO
> {
  constructor(service: ShoeSampleService, mapper: ShoeSampleMapper) {
    super();
    this.mapper = mapper;
    this.service = service;
  }

  @Get('/:id([0-9]+)')
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeSampleDTO | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  public async find(
    @CurrentUser() user: IUser,
    @Query() params?: FindParams<IShoeSample>
  ): Promise<Page<ShoeSampleDTO>> {
    return super.find(user, params);
  }

  @Post()
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: ShoeSampleDTO
  ): Promise<ShoeSampleDTO> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body() body: Partial<ShoeSampleDTO>
  ): Promise<ShoeSampleDTO> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeSampleDTO> {
    return super.delete(user, id);
  }
}
