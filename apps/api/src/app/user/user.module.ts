import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserSeeder } from './user.seeder';
import { UserMapper } from './user.mapper';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  exports: [UserService, UserMapper],
  providers: [UserRepository, UserMapper, UserService, UserSeeder],
})
export class UserModule {}
