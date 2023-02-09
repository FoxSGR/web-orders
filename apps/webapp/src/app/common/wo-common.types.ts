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

export interface WOValueItem extends AbstractWOItem {
  icon?: string;
  value: any;
}

export type WOItem = AbstractWOItem | WOIconItem | WOValueItem;

export type WOItemMap<T extends string = string> = { [key in T]: WOItem };
export type WOIconItemMap<T extends string = string> = {
  [key in T]: WOIconItem;
};

export interface WOActionItem {
  label: string;
  icon: string;
  action: () => void;
}
