import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressModule } from '../address';
import { AgentModule } from '../agent/agent.module';
import { BrandModule } from '../brand/brand.module';
import { ClientController } from './client.controller';
import { ClientMapper } from './client.mapper';
import { ClientService } from './client.service';
import { ClientSeeder } from './client.seeder';
import { ClientRepository } from './client.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientRepository]),
    AddressModule,
    forwardRef(() => AgentModule),
    forwardRef(() => BrandModule),
  ],
  exports: [ClientMapper, ClientService],
  providers: [ClientRepository, ClientMapper, ClientSeeder, ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
