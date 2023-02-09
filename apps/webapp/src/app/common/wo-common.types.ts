export type KeyMap<T> = { [P in keyof Required<T>]: true };

export interface EntityPage<T> {
  size: number;
  offset: number;
  items: T[];
  total: number;
}

export interface EntityList<T> {
  currentPage?: EntityPage<T>;
  state: 'loading' | 'error' | 'loaded';
}

export const initialListState: EntityList<any> = {
  state: 'loading',
};
