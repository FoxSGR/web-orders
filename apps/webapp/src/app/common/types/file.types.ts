import { APIFile } from "@web-orders/api-interfaces";

export type FileState = 'toUpload' | 'stored';

export interface FileData extends APIFile {
  state: FileState;
  file?: File;
}
