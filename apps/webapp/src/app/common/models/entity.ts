import { Id, IEntityDTO } from '@web-orders/api-interfaces';

export class Entity implements IEntityDTO {
  id?: Id;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(entity: IEntityDTO) {
    Object.assign(this, entity);
  }

  initChildEntities(
    entity: IEntityDTO,
    fields: { [key: string]: { new (entity: any): any } },
  ) {
    Object.entries(fields)
      .filter(([key]) => entity[key])
      .forEach(([key, clazz]) => {
        if (Array.isArray(entity[key])) {
          this[key] = entity[key].map(v => new clazz(v));
        } else {
          this[key] = new clazz(entity[key]);
        }
      });
  }
}
