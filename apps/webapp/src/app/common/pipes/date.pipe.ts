import { Pipe, PipeTransform } from '@angular/core';

import dayjs from 'dayjs';

@Pipe({ name: 'woDate' })
export class DatePipe implements PipeTransform {
  transform(value: Date): any {
    return dayjs(value).format('DD/MM/YYYY');
  }
}
