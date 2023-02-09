import { Role } from '@web-orders/api-interfaces';
import type { IEntity } from '../common/entity';

export interface IUser extends IEntity {
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
}
