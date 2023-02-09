import { Id, IEntityDTO } from '@web-orders/api-interfaces';

export class Entity implements IEntityDTO {
  id?: Id;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
