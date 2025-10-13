/**
 * NavItem interface used by the navigation bar to describe each element
 */
export interface NavItem {
  id: string;
  label: string;
  path: string;
  subItems?: NavItem[];
}
