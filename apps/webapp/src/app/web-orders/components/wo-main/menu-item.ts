export interface MenuItem {
  icon: string;
  label: string;
  onClick?: () => void;
  route?: string;
  children?: MenuItem[];
}
