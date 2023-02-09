import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom, tap } from 'rxjs';
import * as uuid from 'uuid';

import { environment } from '../../../environments/environment';
import { alertActions } from '../../alerts';
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

  constructor(private http: HttpClient, private store: Store) {}

  addFile(file: File, state: FileState): FileData {
    const uid = uuid.v4();

    const fileData: FileData = {
      state,
      file,
      uid,
      name: file.name,
      mimeType: file.type,
    };
    this.files[uid] = fileData;

    return fileData;
  }

  unloadFile(uid: string) {
    delete this.files[uid];
  }

  getData(uid: string): FileData {
    return this.files[uid];
  }

  filesEqual(a?: File, b?: File) {
    if (!a && !b) {
      return true;
    } else if ((a && !b) || (b && !a)) {
      return false;
    }

    return (
      a === b ||
      (a!.name === b!.name &&
        a!.size === b!.size &&
        a!.lastModified === b!.lastModified)
    );
  }

  async uploadFile(fileData: FileData) {
    const file = this.files[fileData.uid];
    if (!file) {
      throw new Error('File is not loaded');
    }

    const formData = new FormData();
    formData.append('file', fileData.file!);

    try {
      return await firstValueFrom(
        this.http
          .post(`${environment.api}/file`, formData)
          .pipe(tap(() => this.unloadFile(fileData.uid))),
      );
    } catch (e: any) {
      this.store.dispatch(
        alertActions.showAlert({
          alert: {
            type: 'error',
            message: 'str.common.fileUpload.errors.generic',
            messageParams: {
              name: file.name,
              error: e.message,
            },
          },
        }),
      );
      throw e;
    }
  }
}
