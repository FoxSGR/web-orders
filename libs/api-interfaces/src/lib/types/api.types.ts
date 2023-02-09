export interface IPhoto {
  path: string;
  mimeType: string;
}

export interface IFindFilter {
  prop: string;
  type: 'equals' | 'contains';
  value: any;
}

export interface IFindParams<T> {
  owner?: any;
  loadRelations?: boolean;
  sortField?: string;
  sortDirection?: 'asc' | 'desc' | 'ASC' | 'DESC';
  limit?: number;
  offset?: number;
  filter?: IFindFilter[];
}
