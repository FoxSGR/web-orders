import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs';
import { get } from 'lodash';

import {
  EntityPreviewColumns,
  EntityPreviewItem,
} from '../entity-preview.types';
import { Entity } from '../../../models/entity';

@Component({
  selector: 'wo-entity-preview-list',
  templateUrl: './entity-preview-list.component.html',
  styleUrls: ['./entity-preview-list.component.scss'],
})
export class EntityPreviewListComponent<T extends Entity> {
  @Input()
  model!: T;

  @Input()
  items: EntityPreviewItem[];

  @Input()
  columns?: EntityPreviewColumns;

  @Input()
  indexed = false;

  constructor(private translate: TranslateService) {}

  icon(item: EntityPreviewItem): string {
    return typeof item.icon === 'function' ? item.icon() : item.icon;
  }

  value(item: EntityPreviewItem): Observable<string> {
    let value: Observable<any>;
    if (typeof item.value === 'function') {
      value = item.value();
      if (!(value instanceof Observable)) {
        value = of(value);
      }
    } else if (!item.valueType || item.valueType === 'prop') {
      if (item.value) {
        value = of(get(this.model, item.value as string));
      } else {
        value = of(this.model as any);
      }
    } else {
      value = of(item.value);
    }

    return value.pipe(
      switchMap(v => {
        if (typeof v === 'string' && item.choices?.[v]) {
          return this.translate.get(item.choices[v]?.label);
        } else if (typeof v === 'string' && v.startsWith('str.')) {
          return this.translate.get(v);
        } else {
          return of(v);
        }
      }),
      map(v => {
        if (v instanceof Date) {
          v = dayjs(v).format('DD/MM/YYYY');
        }

        return v;
      }),
    );
  }

  isObject(value: any): boolean {
    return value && typeof value === 'object';
  }

  objectEntries(val: any): [string, string][] {
    return Object.entries(val).filter(([, value]) => !!value) as [
      string,
      string,
    ][];
  }
}
