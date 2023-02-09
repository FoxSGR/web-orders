import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressModule } from '../address';
import { AgentModule } from '../agent/agent.module';
import { Client } from './client.entity';
import { ClientController } from './client.controller';
import { ClientMapper } from './client.mapper';
import { ClientService } from './client.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    AddressModule,
    forwardRef(() => AgentModule),
  ],
  exports: [ClientMapper, ClientService],
  providers: [ClientMapper, ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
