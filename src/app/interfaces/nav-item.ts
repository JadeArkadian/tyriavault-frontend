export interface NavItem {
  id: string;
  label: string;
  path: string;
  subItems?: NavItem[];
}
