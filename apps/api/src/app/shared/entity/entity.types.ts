import { Id } from '@web-orders/api-interfaces';
import type { IUser } from '../../user';

export interface IEntity {
  id: Id;
  base: {
    owner?: IUser | number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  };
}

export interface EntityFieldMapping {
  prop: string;
}
