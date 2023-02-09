import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IEntityDTO, IFindParams } from '@web-orders/api-interfaces';
import { environment } from '../../../environments/environment';
import { createParams } from '../util';
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
  constructor(
    protected http: HttpClient,
    protected config: EntityServiceConfig,
  ) {
    this.config = { ...defaultConfig, ...config };
  }

  findPage(
    params: IFindParams<T>,
    route = this.config.route,
  ): Observable<EntityPage<T>> {
    return this.http
      .get<EntityPage<T>>(`${environment.apiUrl}/${route}`, {
        params: this.createParams(params),
      })
      .pipe(map(page => this.mapPage(page)));
  }

  findById(id: any, params?: any): Observable<T> {
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

  parseEntity(entity: T): T {
    return new this.config.entityClass(entity) as T;
  }

  protected mapPage(page: EntityPage<T>) {
    return {
      ...page,
      items: this.map(page.items),
      size: page.items.length,
    };
  }

  protected createParams(params: IFindParams<any>): HttpParams {
    if (params.filter) {
      params.filter = JSON.stringify(params.filter) as any;
    }

    if (this.config.alwaysLoadRelations) {
      params.loadRelations = true;
    }

    return createParams({
      ...params,
      loadRelations: this.config.alwaysLoadRelations,
    });
  }

  private mapOne(entity: T): T {
    return this.map([entity])[0];
  }

  protected map(entities: T[]): T[] {
    return entities.map(e => this.parseEntity(e));
  }
}
