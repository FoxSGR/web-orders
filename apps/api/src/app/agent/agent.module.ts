import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressModule } from '../address';
import { Agent } from './agent.entity';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { AgentMapper } from './agent.mapper';
import { ClientModule } from '../client/client.module';
import { AgentSeeder } from './agent.seeder';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agent]),
    AddressModule,
    forwardRef(() => ClientModule),
  ],
  exports: [AgentMapper, AgentService],
  providers: [AgentMapper, AgentSeeder, AgentService],
  controllers: [AgentController],
})
export class AgentModule {}
