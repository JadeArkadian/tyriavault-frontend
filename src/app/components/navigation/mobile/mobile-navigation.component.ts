import {ChangeDetectionStrategy, Component, Input, signal} from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';
import {NavItem} from '../../../interfaces/nav-item';
import {MobileLanguageSelectorComponent} from '../../language-selector/mobile/mobile-language-selector.component';

@Component({
  selector: 'app-mobile-navigation',
  standalone: true,
  imports: [TranslocoPipe, MobileLanguageSelectorComponent],
  templateUrl: './mobile-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MobileNavigationComponent {

  // --- Inputs ---
  @Input() navItems: NavItem[] = [];
  @Input() isMenuOpen!: boolean;
  @Input() isMobileAccountDropdownOpen!: boolean;
  @Input() currentPage!: string;

  // --- Outputs / Callbacks ---
  @Input() selectPage!: (pageId: string, path: string) => void;
  @Input() toggleMobileMenu!: () => void;
  @Input() toggleMobileAccountDropdown!: () => void;
  @Input() isCurrentPage!: (pageId: string) => boolean;
  @Input() isAccountActive!: () => boolean;

}
