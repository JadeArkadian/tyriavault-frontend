import {ChangeDetectionStrategy, Component, Input, signal} from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';
import {NavItem} from '../../../interfaces/nav-item';

@Component({
  selector: 'app-desktop-navigation',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './desktop-navigation.component.html',
  styleUrl: './desktop-navigation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopNavigationComponent {

  // --- Inputs ---
  @Input() navItems: NavItem[] = [];
  @Input() currentPage!: string;
  @Input() isAccountDropdownOpen!: boolean;

  // --- Outputs / Callbacks ---
  @Input() selectPage!: (pageId: string, path: string) => void;
  @Input() toggleAccountDropdown!: () => void;
  @Input() closeAccountDropdown!: () => void;
  @Input() isCurrentPage!: (pageId: string) => boolean;
  @Input() isAccountActive!: () => boolean;
}
