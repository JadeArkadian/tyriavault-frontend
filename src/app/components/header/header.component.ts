import {ChangeDetectionStrategy, Component, signal, inject} from '@angular/core';
import {ThemeToggleComponent} from '../theme-toggle/theme-toggle.component';
import {DesktopLanguageSelectorComponent} from '../language-selector/desktop/desktop-language-selector.component';
import {Router} from '@angular/router';
import {DesktopNavigationComponent} from '../navigation/desktop/desktop-navigation.component';
import {NavItem} from '../../interfaces/nav-item';
import {MobileNavigationComponent} from '../navigation/mobile/mobile-navigation.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeToggleComponent, DesktopLanguageSelectorComponent, DesktopNavigationComponent, MobileNavigationComponent],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  private readonly router = inject(Router);

  // Menu states for mobile and desktop dropdowns
  public isMenuOpen = signal(false);
  public isAccountDropdownOpen = signal(false);
  public isMobileAccountDropdownOpen = signal(false);

  // Current active page ID
  public currentPage = signal('home');

  // --- Navigation Data ---
  public navItems: NavItem[] = [
    { id: 'home', label: 'header.home', path: '/' },
    {
      id: 'account', label: 'header.account', path: '/account',/*
      subItems: [
        { id: 'profile', label: 'Profile Settings', path: '/account/profile' },
        { id: 'notifications', label: 'Notifications', path: '/account/notifications' },
        { id: 'billing', label: 'Billing & History', path: '/account/billing' },
      ]*/
    },
    { id: 'tradingpost', label: 'header.tradingpost', path: '/tradingpost' },
    { id: 'characters', label: 'header.characters', path: '/characters' },
    { id: 'analytics', label: 'header.analytics', path: '/analytics' },
  ];

  // --- Methods ---

  public navigate(path: string): void {
    if (path != null) {
      this.router.navigateByUrl(path);
    }
  }

  // Toggles the mobile hamburger menu
  public toggleMobileMenu(): void {
    this.isMenuOpen.update(current => !current);
    // Ensure mobile account dropdown is closed when closing main menu
    if (!this.isMenuOpen()) {
        this.isMobileAccountDropdownOpen.set(false);
    }
  }

  // Toggles the desktop 'Account' dropdown
  public toggleAccountDropdown(): void {
    this.isAccountDropdownOpen.update(current => !current);
  }

  // Closes the desktop 'Account' dropdown (used on blur)
  public closeAccountDropdown(): void {
    // Delay necessary to allow click event to register before blur closes it
    setTimeout(() => this.isAccountDropdownOpen.set(false), 150);
  }

  // Toggles the mobile 'Account' dropdown
  public toggleMobileAccountDropdown(): void {
    this.isMobileAccountDropdownOpen.update(current => !current);
  }

  // Sets the active page
  public selectPage(pageId: string, pathUrl:string): void {
    this.currentPage.set(pageId);
    this.navigate(pathUrl);
    this.isAccountDropdownOpen.set(false);
  }

  // Helper to check if a page is the current page
  public isCurrentPage(pageId: string): boolean {
    return this.currentPage() === pageId;
  }

  // Helper to check if any Account sub-page is active,
  // used to highlight the main 'Account' link/dropdown
  public isAccountActive(): boolean {
    const accountItem = this.navItems.find(item => item.id === 'account');
    if (!accountItem?.subItems) return false;

    return accountItem.subItems.some(subItem => this.isCurrentPage(subItem.id)) || this.isCurrentPage('account');
  }

}
