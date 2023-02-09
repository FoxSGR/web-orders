import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  constructor(private platform: Platform) {}

  /**
   * Whether the current device is a mobile device.
   * @returns
   */
  isMobile(): boolean {
    return this.platform.is('mobile');
  }
}
