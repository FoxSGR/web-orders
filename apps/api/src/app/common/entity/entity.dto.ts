import { Id, IEntityDTO } from '@web-orders/api-interfaces';

export class EntityDTO implements IEntityDTO {
  id?: Id;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
