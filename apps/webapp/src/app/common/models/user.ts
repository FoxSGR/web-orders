import { IUserDTO, Role } from '@web-orders/api-interfaces';
import { Entity } from './entity';

export class User extends Entity implements IUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  roles: Role[];
  resourcesFolder: string;
}
