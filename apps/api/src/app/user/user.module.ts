import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserService } from './user.service';
import { UserSeeder } from './user.seeder';
import { UserMapper } from './user.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService, UserMapper],
  providers: [UserMapper, UserService, UserSeeder],
})
export class UserModule {}
