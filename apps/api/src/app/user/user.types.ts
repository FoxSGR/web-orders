import { Role } from '@web-orders/api-interfaces';
import { IEntity } from '../common';

export interface IUser extends IEntity {
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
}
