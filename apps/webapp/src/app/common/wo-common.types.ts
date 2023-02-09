export interface EntityPage<T> {
  size: number;
  offset: number;
  items: T[];
  total: number;
  extra?: object;
}

interface AbstractWOItem {
  label: string;
}

export interface WOIconItem extends AbstractWOItem {
  icon: string;
}

export type WOItem = AbstractWOItem | WOIconItem;

export type WOItemMap<T extends string = string> = { [key in T]: WOItem };
export type WOIconItemMap<T extends string = string> = {
  [key in T]: WOIconItem;
};
