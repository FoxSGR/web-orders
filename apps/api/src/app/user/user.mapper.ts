import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';

import { IUser } from './user.types';
import { UserDTO } from './user.dto';
import { EntityMapper } from '../common/entity/entity.mapper';

@Injectable()
export class UserMapper extends EntityMapper<IUser, UserDTO> {
  bodyToEntity(body: Partial<UserDTO>, user: IUser): DeepPartial<IUser> {
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
    };
  }

  entityToResponse(input: IUser): Partial<UserDTO> {
    return {
      ...super.entityToResponse(input),
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      roles: input.roles,
    };
  }
}
