import { Role } from '@web-orders/api-interfaces';
import type { IEntity } from '../shared/entity';

export interface IUser extends IEntity {
  firstName: string;
  lastName: string;
  email: string;
  resourcesFolder: string;
  roles: Role[];
}
