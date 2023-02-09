import { Component, Injector, ViewChild } from '@angular/core';

import { DeviceService } from '../../../services';
import { SmartFormFileUpload } from '../../../types';
import { SmartFormAbstractItemComponent } from '../smart-form-abstract-item.component';

@Component({
  selector: 'wo-smart-form-file-upload',
  templateUrl: './smart-form-file-upload.component.html',
})
export class SmartFormFileUploadComponent extends SmartFormAbstractItemComponent<
  any,
  SmartFormFileUpload
> {
  @ViewChild('uploadInput') uploadInput: HTMLInputElement;

  constructor(injector: Injector, private deviceService: DeviceService) {
    super(injector);
  }

  /**
   * Whether the current device is a mobile device.
   * @returns
   */
  isMobile(): boolean {
    return this.deviceService.isMobile();
  }
}
