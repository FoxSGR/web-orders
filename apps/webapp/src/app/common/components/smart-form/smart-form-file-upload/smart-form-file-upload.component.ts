import { Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { isEmpty } from 'lodash';

import { DeviceService } from '../../../services';
import { SmartFormFiles, SmartFormFileUpload } from '../../../types';
import { SmartFormAbstractItemComponent } from '../smart-form-abstract-item.component';

@Component({
  selector: 'wo-smart-form-file-upload',
  templateUrl: './smart-form-file-upload.component.html',
  styleUrls: ['./smart-form-file-upload.component.scss'],
})
export class SmartFormFileUploadComponent extends SmartFormAbstractItemComponent<
  SmartFormFiles,
  SmartFormFileUpload
> {
  @ViewChild('uploadInput') uploadInput: ElementRef<HTMLInputElement>;

  override defaultValue: SmartFormFiles = {
    files: [],
  };

  constructor(injector: Injector, private deviceService: DeviceService) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();

    // since files cannot be serialized, the value must be reset
    if (this.value?.files?.[0] && isEmpty(this.value?.files?.[0])) {
      this.restoreDefaultValue();
      this.onChange();
    }
  }

  /**
   * Whether the current device is a mobile device.
   * @returns
   */
  isMobile(): boolean {
    return this.deviceService.isMobile();
  }

  onFilePick() {
    this.value!.files = Array.from(
      this.uploadInput?.nativeElement?.files || [],
    );
    this.onChange();
  }

  removeFile(file: File) {
    console.log(file);
  }
}
