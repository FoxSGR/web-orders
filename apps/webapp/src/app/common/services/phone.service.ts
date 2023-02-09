import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { PhoneIntlConfig, ResponseDataItems } from '@web-orders/api-interfaces';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PhoneService {
  private intlConfigs$?: BehaviorSubject<PhoneIntlConfig[] | undefined>;

  constructor(private http: HttpClient) {}

  /**
   * Gets international phone number configurations from the API.
   */
  getIntlConfigs(): Observable<PhoneIntlConfig[]> {
    if (!this.intlConfigs$) {
      this.intlConfigs$ = new BehaviorSubject(undefined) as any;

      this.http
        .get<ResponseDataItems<PhoneIntlConfig>>(
          `${environment.apiUrl}/common/phone/intl-configs`,
        )
        .pipe(map(response => response.data.items))
        .subscribe(configs => this.intlConfigs$!.next(configs));
    }

    return this.intlConfigs$!.asObservable().pipe(
      filter(configs => !!configs),
    ) as Observable<PhoneIntlConfig[]>;
  }

  /**
   * Finds the international prefix on a phone number.
   * @param configs
   * @param phoneNumber
   */
  prefixFromNumber(
    configs: PhoneIntlConfig[],
    phoneNumber: string,
  ): string | undefined {
    if (!phoneNumber || !phoneNumber.startsWith('+')) {
      return undefined;
    }

    for (const config of configs) {
      if (phoneNumber.startsWith(config.prefix)) {
        return config.prefix;
      }
    }

    return undefined;
  }
}
