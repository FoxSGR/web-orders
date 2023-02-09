import { Pipe, PipeTransform } from '@angular/core';

import dayjs from 'dayjs';

@Pipe({ name: 'wodate', standalone: true })
export class DatePipe implements PipeTransform {
  transform(value: Date | string, time = false): any {
    if (!value) {
      return '';
    }

    let format = 'DD/MM/YYYY';
    if (time) {
      format = `HH:mm ${format}`;
    }

    return dayjs(value).format(format);
  }
}
