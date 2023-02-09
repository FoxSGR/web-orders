import type { IUser } from '../../user';

export type Id = number;

export interface IEntity {
  id: Id;
  base: {
    owner?: IUser | number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  };
}
