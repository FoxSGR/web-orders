import { IEntity } from '../common';
import { Role } from './roles';

export interface IUser extends IEntity {
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
}
