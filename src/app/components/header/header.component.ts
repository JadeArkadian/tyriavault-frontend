import {ChangeDetectionStrategy, Component, signal, inject, OnInit} from '@angular/core';
import {ThemeToggleComponent} from '../theme-toggle/theme-toggle.component';
import {DesktopLanguageSelectorComponent} from '../language-selector/desktop/desktop-language-selector.component';
import {NavigationEnd, Router} from '@angular/router';
import {DesktopNavigationComponent} from '../navigation/desktop/desktop-navigation.component';
import {NavItem} from '../../interfaces/nav-item';
import {MobileNavigationComponent} from '../navigation/mobile/mobile-navigation.component';
import {filter} from 'rxjs/operators';


/**
 * This is the Header component. It wraps components for navigation both for mobile and  desktop platforms
 * @see MobileNavigationComponent @see DesktopNavigationComponent , a theme toggler @see ThemeToggleComponent
 * and also a Language selection @see DesktopLanguageSelectorComponent.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeToggleComponent, DesktopLanguageSelectorComponent, DesktopNavigationComponent, MobileNavigationComponent],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

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

  /**
   * Init of the component. 
   * Sets the currentPage so the navBar knows which page we are on
   */
  public ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const currentPath = event.urlAfterRedirects;
      const activeItem = this.navItems.find(item => item.path === currentPath);
      if (activeItem) {
        this.currentPage.set(activeItem.id);
      }
    });
  }

  // --- Methods ---

  /**
   * Method called to force the navigation
   * @param path Path to be called
   */
  public navigate(path: string): void {
    if (path != null) {
      this.router.navigateByUrl(path);
    }
  }

  /**
   * Toggles the mobile hamburger menu
   */
  public toggleMobileMenu(): void {
    this.isMenuOpen.update(current => !current);
    // Ensure mobile account dropdown is closed when closing main menu
    if (!this.isMenuOpen()) {
        this.isMobileAccountDropdownOpen.set(false);
    }
  }

  /**
   * Toggles the desktop 'Account' dropdown
   */
  public toggleAccountDropdown(): void {
    this.isAccountDropdownOpen.update(current => !current);
  }

  /**
   * Closes the desktop 'Account' dropdown (used on blur event)
   */
  public closeAccountDropdown(): void {
    // Delay necessary to allow click event to register before blur closes it
    setTimeout(() => this.isAccountDropdownOpen.set(false), 150);
  }

  /**
   * Toggles the mobile 'Account' dropdown
   */
  public toggleMobileAccountDropdown(): void {
    this.isMobileAccountDropdownOpen.update(current => !current);
  }

  /**
   * Sets the active page both for Dekstop and Mobile menu
   * @param pageId 
   * @param pathUrl
   */
  public selectPage(pageId: string, pathUrl:string): void {
    this.currentPage.set(pageId);
    this.navigate(pathUrl);
    this.isAccountDropdownOpen.set(false);
  }

  /**
   * Helper to check if a page is the current page
   * @param pageId 
   * @returns 
   */
  public isCurrentPage(pageId: string): boolean {
    return this.currentPage() === pageId;
  }

  /**
   * Helper to check if any Account sub-page is active,
   * used to highlight the main 'Account' link/dropdown
   * TODO: Check if we should remove this since actually the account menu might not have submenus anymore
   * @returns 
   */
  public isAccountActive(): boolean {
    const accountItem = this.navItems.find(item => item.id === 'account');
    if (!accountItem?.subItems) return false;

    return accountItem.subItems.some(subItem => this.isCurrentPage(subItem.id)) || this.isCurrentPage('account');
  }

}
