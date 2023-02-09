import { Observable } from 'rxjs';

export interface EntityPreviewItem {
  icon: string | (() => string);
  label: string;
  value: string | object | Date | (() => Observable<any>);
  type?: 'simple' | 'text';
}
