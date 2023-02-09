import { Id } from '../types';

export class EntityDTO {
  id?: Id;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
