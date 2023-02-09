import { Repository, SelectQueryBuilder } from 'typeorm';

import { IEntity } from './entity.types';
import { FindParams } from '../types';

export class WOEntityRepository<T extends IEntity> extends Repository<T> {
  findPage(params: FindParams<T>) {
    const queryBuilder = this.createQueryBuilder('e')
      .where('e.base.owner.id = :userId', { userId: params.owner.id })
      .addOrderBy(
        params.sortField || 'e.id',
        params.sortDirection?.toUpperCase() || ('DESC' as any),
      )
      .take(params.limit)
      .skip(params.offset);

    if (params.loadRelations) {
      this.joinRelations(queryBuilder);
    }

    return queryBuilder.getManyAndCount();
  }

  private joinRelations(queryBuilder: SelectQueryBuilder<T>) {
    for (const relation of this.metadata.columns) {
      const relationMetadata = relation.relationMetadata;
      if (!relationMetadata) {
        continue;
      }

      if (relationMetadata.relationType === 'one-to-one') {
        const conditions = [];
        const idx = `e_${relationMetadata.propertyName}`;
        for (const column of relationMetadata.joinColumns) {
          conditions.push(
            `e.${column.databaseName} = ${idx}.${column.referencedColumn.databaseName}`,
          );
        }

        queryBuilder.innerJoinAndMapOne(
          `e.${relationMetadata.propertyName}`,
          relationMetadata.type,
          idx,
          conditions.join(' AND '),
        );
      }
    }
  }
}
