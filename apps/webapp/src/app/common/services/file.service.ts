import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

type FileState = 'toUpload' | 'stored';

interface FileData {
  state: 'toUpload' | 'stored';
  file: File;
}

/**
 * Service to manage file uploads.
 */
@Injectable({ providedIn: 'root' })
export class FileService {
  /**
   * Files to upload.
   * This is used so that the files can be persisted in memory across component
   * cycles.
   */
  private files: { [key: string]: FileData } = {};

  addFile(file: File, state: FileState): string {
    const uid = uuid.v4();
    this.files[uid] = {
      state,
      file
    };

    return uid;
  }

  unloadFile(uid: string) {
    delete this.files[uid]
  }
}