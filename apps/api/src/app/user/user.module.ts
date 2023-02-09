import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserService } from './user.service';
import { UserSeeder } from './user.seeder';
import { UserMapper } from './user.mapper';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService, UserMapper],
  providers: [UserRepository, UserMapper, UserService, UserSeeder],
})
export class UserModule {}
