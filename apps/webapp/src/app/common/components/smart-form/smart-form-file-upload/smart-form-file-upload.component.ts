import {
  Component,
  ElementRef,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';

import { FileService } from '../../../services';
import { FileData, SmartFormFiles, SmartFormFileUpload } from '../../../types';
import { SmartFormAbstractItemComponent } from '../smart-form-abstract-item.component';

@Component({
  selector: 'wo-smart-form-file-upload',
  templateUrl: './smart-form-file-upload.component.html',
  styleUrls: ['./smart-form-file-upload.component.scss'],
})
export class SmartFormFileUploadComponent
  extends SmartFormAbstractItemComponent<SmartFormFiles, SmartFormFileUpload>
  implements OnInit
{
  @ViewChild('uploadInput') uploadInput: ElementRef<HTMLInputElement>;

  override defaultValue: SmartFormFiles = {
    files: [],
  };

  constructor(injector: Injector, private fileService: FileService) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.checkFiles();
  }

  onFilePick() {
    const inputFiles = Array.from(this.uploadInput.nativeElement.files || []);
    if (inputFiles.length === 0) {
      return;
    }

    for (const file of inputFiles) {
      // skip previously selected files
      if (
        this.value!.files.find(f =>
          this.fileService.filesEqual(
            file,
            this.fileService.getData(f.uid).file!,
          ),
        )
      ) {
        continue;
      }

      const fileData = { ...this.fileService.addFile(file, 'toUpload') };
      delete fileData.file;
      this.value!.files.push(fileData);
    }

    // clear the file input
    this.uploadInput.nativeElement.value = '';

    this.onChange();
    this.cdr.detectChanges();
  }

  removeFile(uid: string) {
    this.value!.files = this.value!.files.filter(file => file.uid !== uid);
    this.onChange();
  }

  handleReorder(event: any) {
    const old = this.value!.files.splice(event.detail.from, 1)[0];
    this.value!.files.splice(event.detail.to, 0, old);
    event.detail.complete();
    this.onChange();
  }

  private checkFiles() {
    if (!this.value) {
      return;
    }

    const previousLength = this.value.files.length;
    this.value.files = this.value.files.filter(
      file => file.state !== 'toUpload' || this.fileService.getData(file.uid),
    );
    if (this.value.files.length !== previousLength) {
      this.onChange();
    }
  }

  getFile(uid: string): File | undefined {
    return this.fileService.getData(uid)?.file;
  }

  isImage(mimeType: string): boolean {
    return mimeType.startsWith('image/');
  }
}
