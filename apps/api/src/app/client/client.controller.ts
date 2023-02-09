import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
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
import { CurrentUser, FindParams, Page } from '../shared';
import { EntityController } from '../shared/entity';
import { IUser } from '../user';
import { BrandDTO } from '../brand/brand.dto';
import { BrandMapper } from '../brand/brand.mapper';

@Controller('/client')
export class ClientController extends EntityController<IClient, ClientDTO> {
  constructor(
    service: ClientService,
    mapper: ClientMapper,
    @Inject(forwardRef(() => BrandMapper)) private brandMapper: BrandMapper,
  ) {
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

  @Get('/:id([0-9]+)/brand')
  public async findBrands(
    @CurrentUser() user: IUser,
    @Param('id') id: number,
    @Query() params?: FindParams<IClient>,
  ): Promise<Page<Partial<BrandDTO>>> {
    params.owner = user;
    if (params.filter) {
      params.filter = JSON.parse(params.filter as any);
    }

    const service = this.service as ClientService;
    const page = await service.findBrands(id, params);
    return {
      ...page,
      items: this.brandMapper.entitiesToResponse(page.items) as BrandDTO[],
      extra: {
        universal: this.brandMapper.entitiesToResponse(page.extra['universal']),
      },
    };
  }
}
