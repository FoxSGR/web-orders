import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Address } from './address.entity';
import { AddressMapper } from './address.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  exports: [AddressMapper],
  providers: [AddressMapper],
})
export class AddressModule {}
