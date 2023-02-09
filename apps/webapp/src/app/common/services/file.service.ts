import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom, tap } from 'rxjs';
import * as uuid from 'uuid';
import { deburr } from 'lodash';

import { environment } from '../../../environments/environment';
import { FileData, FileState } from '../types';
import { Account, getAccount } from '../../account';
import { AlertService } from './alert.service';

/**
 * Service to manage file uploads.
 */
@Injectable({ providedIn: 'root' })
export class FileService {
  /**
   * Authenticated account data.
   * @private
   */
  private account!: Account;

  /**
   * Files to upload.
   * This is used so that the files can be persisted in memory across component
   * cycles.
   */
  private files: { [key: string]: FileData } = {};

  constructor(
    private http: HttpClient,
    private store: Store,
    private alertService: AlertService,
  ) {
    this.store
      .select(getAccount)
      .subscribe(account => (this.account = account!));
  }

  /**
   * Adds a file to memory.
   * @param file
   * @param state
   */
  addFile(file: File, state: FileState): FileData {
    const uid = uuid.v4();

    const fileData: FileData = {
      state,
      file,
      uid,
      name: deburr(file.name),
      mimeType: file.type,
    };
    this.files[uid] = fileData;

    return fileData;
  }

  /**
   * Unloads a file from memory.
   * @param uid
   */
  unloadFile(uid: string) {
    delete this.files[uid];
  }

  /**
   * Gets stored data of a file.
   * @param uid
   */
  getData(uid: string): FileData {
    return this.files[uid];
  }

  /**
   * Checks if two files are equal.
   * @param a
   * @param b
   */
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

  /**
   * Builds a URL to a file.
   * @param fileData
   */
  buildUrl(fileData: FileData) {
    return `${environment.resources}/${this.account.resourcesFolder}/${fileData.uid}_${fileData.name}`;
  }

  /**
   * Uploads a file.
   * @param fileData
   */
  async uploadFile(fileData: FileData) {
    const file = this.files[fileData.uid];
    if (!file?.file) {
      throw new Error('File is not loaded');
    }

    const newFileName = fileData.uid + '_' + fileData.name;
    const newFile = new File([file.file], newFileName, {
      lastModified: file.file.lastModified,
      type: file.file.type,
    });

    const formData = new FormData();
    formData.append('file', newFile);

    try {
      return await firstValueFrom(
        this.http
          .post(`${environment.api}/resources/file`, formData)
          .pipe(tap(() => this.unloadFile(fileData.uid))),
      );
    } catch (e: any) {
      this.alertService.showAlert({
        type: 'error',
        message: 'str.common.fileUpload.errors.generic',
        messageParams: {
          name: file.name,
          error: e.message,
        },
      });
      throw e;
    }
  }
}
