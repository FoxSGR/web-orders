import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IEntityDTO, IFindParams } from '@web-orders/api-interfaces';
import { environment } from '../../../environments/environment';
import { createParams } from '../util/requests';
import { EntityPage } from '../wo-common.types';
import { Entity } from '../models/entity';

export interface EntityServiceConfig<T extends Entity = Entity> {
  entityClass: { new (entity: IEntityDTO): T };
  route: string;
  alwaysLoadRelations?: boolean;
}

const defaultConfig: Partial<EntityServiceConfig> = {
  alwaysLoadRelations: false,
};

export class EntityService<T extends Entity> {
  constructor(private http: HttpClient, protected config: EntityServiceConfig) {
    this.config = { ...defaultConfig, ...config };
  }

  findPage(params: IFindParams<T>): Observable<EntityPage<T>> {
    const filter = params.filter ? JSON.stringify(params.filter) : undefined;
    delete params.filter;

    return this.http
      .get<EntityPage<T>>(`${environment.apiUrl}/${this.config.route}`, {
        params: createParams({
          ...params,
          filter,
          loadRelations: this.config.alwaysLoadRelations,
        }),
      })
      .pipe(
        map(page => ({
          ...page,
          items: this.map(page.items),
          size: page.items.length,
        })),
      );
  }

  findById(id: any, params?: any): Observable<T | undefined> {
    return this.http
      .get<T>(`${environment.apiUrl}/${this.config.route}/${id}`, {
        params: createParams(params),
      })
      .pipe(map(e => this.mapOne(e)));
  }

  create(entity: T): Observable<T> {
    return this.http
      .post<T>(`${environment.apiUrl}/${this.config.route}`, entity)
      .pipe(map(e => this.mapOne(e)!));
  }

  update(entity: T): Observable<T> {
    return this.http
      .put<T>(`${environment.apiUrl}/${this.config.route}/${entity.id}`, entity)
      .pipe(map(e => this.mapOne(e)!));
  }

  delete(id: string | number): Observable<T> {
    return this.http
      .delete<T>(`${environment.apiUrl}/${this.config.route}/${id}`)
      .pipe(map(e => this.mapOne(e)!));
  }

  private mapOne(entity: T | undefined): T | undefined {
    if (entity) {
      return this.map([entity])[0];
    }

    return entity;
  }

  protected map(entities: T[]): T[] {
    return entities.map(e => new this.config.entityClass(e)) as T[];
  }
}
