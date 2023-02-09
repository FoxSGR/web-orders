export type FileState = 'toUpload' | 'stored';

export interface FileData {
  uid: string;
  name: string;
  file?: File;
  default?: boolean;
  state: FileState;
}
