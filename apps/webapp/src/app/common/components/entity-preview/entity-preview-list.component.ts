import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import get from 'lodash/get';

import { EntityPreviewItem } from './entity-preview.types';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs';

@Component({
  selector: 'wo-entity-preview-list',
  templateUrl: './entity-preview-list.component.html',
})
export class EntityPreviewListComponent {
  @Input()
  model?: any;

  @Input()
  items: EntityPreviewItem[];

  @Input()
  columns: 1 | 2 | 3 | 4 = 2;

  @Input()
  indexed = false;

  icon(item: EntityPreviewItem): string {
    return typeof item.icon === 'function' ? item.icon() : item.icon;
  }

  value(item: EntityPreviewItem): Observable<string> {
    let value: Observable<any>;
    if (typeof item.value === 'function') {
      value = item.value();
    } else if (this.model && typeof item.value === 'string') {
      value = of(get(this.model, item.value));
    } else {
      value = of(item.value);
    }

    return value.pipe(
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
