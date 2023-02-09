export interface APIFile {
  mimeType: string;
  uid: string;
  name: string;
  default?: boolean;
}

export interface ResponseData<T> {
  data: T;
}

export interface ResponseDataItems<T> {
  data: {
    items: T[];
  };
}

export interface IFindFilter {
  prop: string;
  type: 'equals' | 'contains';
  negate?: boolean;
  value: any;
}

export interface IFindParams<T> {
  owner?: any;
  loadRelations?: 'true' | 'false' | boolean;
  sortField?: string;
  sortDirection?: 'asc' | 'desc' | 'ASC' | 'DESC';
  limit?: number;
  offset?: number;
  filter?: IFindFilter[];
}
