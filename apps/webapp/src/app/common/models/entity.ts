import { Id, IEntityDTO } from '@web-orders/api-interfaces';
import dayjs from 'dayjs';

export class Entity implements IEntityDTO {
  id?: Id;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(entity: IEntityDTO) {
    this.initDateFields(entity);
    Object.assign(this, entity);
  }

  protected initChildEntities<T extends IEntityDTO>(
    entity: T,
    fields: Map<keyof T, new (entity: any) => any>,
  ) {
    Array.from(fields.entries())
      .filter(([key]) => !!entity[key])
      .forEach(([k, clazz]) => {
        const key = k as string;

        if (Array.isArray(entity[key])) {
          this[key] = entity[key].map(v => new clazz(v));
        } else {
          this[key] = new clazz(entity[key]);
        }
      });
  }

  private initDateFields(entity: IEntityDTO) {
    Object.entries(entity)
      .filter(
        ([, value]) =>
          value &&
          typeof value === 'string' &&
          value.match(/\d{4}-\d{1,2}-\d{1,2}T\d{1,2}:\d{1,2}:\d{1,2}.\d+Z?/) &&
          dayjs(value).isValid(),
      )
      .forEach(([key, value]) => (entity[key] = dayjs(value).toDate()));
  }
}
