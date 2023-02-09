import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

import { FileData, FileState } from '../types';

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

  addFile(file: File, state: FileState): FileData {
    const uid = uuid.v4();

    const fileData = {
      state,
      file,
      uid,
      name: file.name,
    };
    this.files[uid] = fileData;

    return fileData;
  }

  getData(uid: string): FileData {
    return this.files[uid];
  }

  filesEqual(a: File, b: File) {
    return (
      a === b ||
      (a.name === b.name &&
        a.size === b.size &&
        a.lastModified === b.lastModified)
    );
  }
}
