import {
  Component,
  ElementRef,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';

import { DialogService, FileService } from '../../../services';
import { SmartFormFiles, SmartFormFileUpload } from '../../../types';
import { SmartFormAbstractItemComponent } from '../smart-form-abstract-item.component';
import { IonCheckbox } from '@ionic/angular';

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

  constructor(
    injector: Injector,
    private fileService: FileService,
    private dialogService: DialogService,
  ) {
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

      // if it's the first file, make it the default
      if (this.value!.files.length === 1) {
        fileData.default = true;
      }
    }

    // clear the file input
    this.uploadInput.nativeElement.value = '';

    this.onChange();
    this.cdr.detectChanges();
  }

  removeFile(uid: string) {
    this.dialogService.confirm(() => {
      this.value!.files = this.value!.files.filter(file => file.uid !== uid);
      this.onChange();
    });
  }

  handleReorder(event: any) {
    const old = this.value!.files.splice(event.detail.from, 1)[0];
    this.value!.files.splice(event.detail.to, 0, old);
    event.detail.complete();
    this.onChange();
  }

  changeDefault(uid: string, event: MouseEvent) {
    // cancel the event to prevent overriding the value set below with the click
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    const file = this.value!.files.find(f => f.uid === uid)!;
    if (file.default) {
      return;
    }

    for (const file of this.value!.files) {
      file.default = file.uid === uid;
    }

    this.cdr.detectChanges();
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
