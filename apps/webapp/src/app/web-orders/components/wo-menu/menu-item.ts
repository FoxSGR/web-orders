export interface MenuItem {
  type: string;
}

export interface MenuButton extends MenuItem {
  type: 'button';
  icon: string;
  label: string;
  onClick: () => void;
}
