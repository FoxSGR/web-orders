import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressModule } from '../address';
import { AgentModule } from '../agent/agent.module';
import { Client } from './client.entity';
import { ClientController } from './client.controller';
import { ClientMapper } from './client.mapper';
import { ClientService } from './client.service';
import { ClientSeeder } from './client.seeder';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    AddressModule,
    forwardRef(() => AgentModule),
  ],
  exports: [ClientMapper, ClientService],
  providers: [ClientMapper, ClientSeeder, ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
