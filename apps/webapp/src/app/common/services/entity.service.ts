import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { createParams } from '../util/requests';
import { EntityPage } from '../wo-common.types';

export interface FindPageParams {
  limit?: number;
  offset?: number;
  sortField?: string;
  sortDirection?: any;
  filter?: string;
}

export interface EntityServiceConfig {
  route: string;
  alwaysLoadRelations?: boolean;
}

const defaultConfig: Partial<EntityServiceConfig> = {
  alwaysLoadRelations: false,
};

export class EntityService<T extends { id?: number }> {
  constructor(private http: HttpClient, protected config: EntityServiceConfig) {
    this.config = { ...defaultConfig, ...config };
  }

  findPage(params: FindPageParams): Observable<EntityPage<T>> {
    return this.http
      .get<EntityPage<T>>(`${environment.apiUrl}/${this.config.route}`, {
        params: createParams({
          ...params,
          loadRelations: this.config.alwaysLoadRelations,
        }),
      })
      .pipe(
        map((page) => ({
          ...page,
          size: page.items.length,
        })),
      );
  }

  findById(id: any, params?: any): Observable<T> {
    return this.http.get<T>(
      `${environment.apiUrl}/${this.config.route}/${id}`,
      {
        params: createParams(params),
      },
    );
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(
      `${environment.apiUrl}/${this.config.route}`,
      entity,
    );
  }

  update(entity: T): Observable<T> {
    return this.http.post<T>(
      `${environment.apiUrl}/${this.config.route}/${entity.id}`,
      entity,
    );
  }

  remove(id: string | number): Observable<T> {
    return this.http.delete<T>(
      `${environment.apiUrl}/${this.config.route}/${id}`,
    );
  }
}
