import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';

@Component({
  selector: 'app-header',
  imports: [LanguageSelectorComponent, TranslocoDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HeaderComponent {

  private router = inject(Router);

  public navigate(path: string): void {
    this.router.navigateByUrl(path);
  }

}


/**
 import { ChangeDetectionStrategy, Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

// Define the structure for a navigation item
interface NavItem {
  id: string;
  label: string;
  icon: string; // Tailwind/Lucide-like icon name
  path: string;
  subItems?: NavItem[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- The main application container applies the theme class -->
    <div [class]="(isDarkTheme() ? 'dark' : 'light') + ' min-h-screen transition-colors duration-300'">
      
      <!-- Container for light/dark theme styles -->
      <div class="dark:bg-gray-900 dark:text-gray-100 bg-gray-50 text-gray-900 min-h-screen">
        
        <!-- Header / Navigation Bar (Desktop & Mobile) -->
        <header class="shadow-lg dark:shadow-xl dark:shadow-indigo-900/50 bg-white dark:bg-gray-800 sticky top-0 z-40">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">

              <!-- Logo / App Title -->
              <div class="flex-shrink-0">
                <span class="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block mr-2 align-text-bottom"><path d="M12 2l8 4.5v9l-8 4.5-8-4.5v-9L12 2z"/><path d="M12 2v20"/><path d="M20 6l-8 4.5l-8-4.5"/><path d="M4 15.5l8 4.5l8-4.5"/></svg>
                  App
                </span>
              </div>

              <!-- Desktop Navigation Links -->
              <nav class="hidden md:flex md:space-x-4 lg:space-x-8 items-center">
                <!-- Main Nav Links -->
                <ng-container *ngFor="let item of navItems">
                  <ng-container *ngIf="!item.subItems">
                    <button 
                      (click)="selectPage(item.id)"
                      [class]="isCurrentPage(item.id) ? 
                        'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500 font-semibold' : 
                        'text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'"
                      class="px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                    >
                      {{ item.label }}
                    </button>
                  </ng-container>

                  <!-- Dropdown Nav Link (Account) -->
                  <div *ngIf="item.subItems" class="relative group">
                    <button
                      (click)="toggleAccountDropdown()"
                      (blur)="closeAccountDropdown()"
                      class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                      [class]="isAccountActive() ? 
                        'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500 font-semibold' : 
                        'text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'"
                    >
                      {{ item.label }}
                      <svg class="ml-1 h-5 w-5 transition-transform duration-200" [class.rotate-180]="isAccountDropdownOpen()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>
                    </button>
                    <!-- Dropdown Menu -->
                    <div *ngIf="isAccountDropdownOpen()" class="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <ng-container *ngFor="let subItem of item.subItems">
                        <button
                          (click)="selectPage(subItem.id)"
                          class="block px-4 py-2 text-sm w-full text-left transition-colors duration-150"
                          [class]="isCurrentPage(subItem.id) ? 
                            'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-medium' : 
                            'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'"
                        >
                          {{ subItem.label }}
                        </button>
                      </ng-container>
                    </div>
                  </div>
                </ng-container>
              </nav>

              <!-- Controls (Language & Theme) -->
              <div class="flex items-center space-x-4">
                
                <!-- Language Dropdown -->
                <div class="relative hidden md:block">
                  <select 
                    (change)="setLanguage($event)" 
                    [value]="currentLanguage()"
                    class="appearance-none block w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:text-white"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.94l-4.243-4.243-1.414 1.414L10 13.95z"/></svg>
                  </div>
                </div>

                <!-- Theme Toggle -->
                <button 
                  (click)="toggleTheme()"
                  title="Switch Theme"
                  class="p-2 rounded-full transition-colors duration-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <!-- Moon (Dark Theme) -->
                  <svg *ngIf="!isDarkTheme()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600 dark:text-gray-300 h-6 w-6"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                  <!-- Sun (Light Theme) -->
                  <svg *ngIf="isDarkTheme()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-500 h-6 w-6"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                </button>

                <!-- Mobile Menu Button -->
                <button 
                  (click)="toggleMobileMenu()"
                  type="button" 
                  class="md:hidden p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-controls="mobile-menu" 
                  aria-expanded="false"
                >
                  <!-- Hamburger / Close Icon -->
                  <svg *ngIf="!isMenuOpen()" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                  <svg *ngIf="isMenuOpen()" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Mobile Menu Panel (Hidden by default, shown when toggled) -->
          <div *ngIf="isMenuOpen()" class="md:hidden transition-all duration-300 ease-in-out" id="mobile-menu">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <!-- Mobile Nav Links -->
              <ng-container *ngFor="let item of navItems">
                <ng-container *ngIf="!item.subItems">
                  <button 
                    (click)="selectPage(item.id); toggleMobileMenu()"
                    [class]="isCurrentPage(item.id) ? 
                      'bg-indigo-50 dark:bg-indigo-700/50 text-indigo-700 dark:text-indigo-300 font-semibold' : 
                      'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
                    class="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors"
                  >
                    {{ item.label }}
                  </button>
                </ng-container>

                <!-- Mobile Dropdown (Account) -->
                <div *ngIf="item.subItems" class="space-y-1">
                  <button 
                    (click)="toggleMobileAccountDropdown()"
                    class="flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors"
                    [class]="isAccountActive() ? 
                      'bg-indigo-50 dark:bg-indigo-700/50 text-indigo-700 dark:text-indigo-300 font-semibold' : 
                      'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
                  >
                    <span>{{ item.label }}</span>
                    <svg class="ml-1 h-5 w-5 transition-transform duration-200" [class.rotate-180]="isMobileAccountDropdownOpen()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>
                  </button>
                  
                  <!-- Mobile Sub-Items -->
                  <div *ngIf="isMobileAccountDropdownOpen()" class="pl-4 border-l border-indigo-500/50 space-y-1">
                    <ng-container *ngFor="let subItem of item.subItems">
                      <button
                        (click)="selectPage(subItem.id); toggleMobileMenu()"
                        class="block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        [class]="isCurrentPage(subItem.id) ? 
                            'bg-indigo-100 dark:bg-indigo-800/50 text-indigo-700 dark:text-indigo-200 font-medium' : 
                            'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'"
                      >
                        {{ subItem.label }}
                      </button>
                    </ng-container>
                  </div>
                </div>
              </ng-container>

              <!-- Mobile Language Dropdown -->
              <div class="pt-2">
                <label for="mobile-language" class="sr-only">Select Language</label>
                <select 
                  id="mobile-language"
                  (change)="setLanguage($event)" 
                  [value]="currentLanguage()"
                  class="block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:text-white"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content Area -->
        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 p-4">
          <div class="rounded-xl shadow-2xl p-8 dark:bg-gray-800 bg-white border border-gray-200 dark:border-gray-700">
            <h1 class="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
              {{ getCurrentPageLabel() }}
            </h1>
            <p class="text-gray-700 dark:text-gray-300">
              This is the content for the <strong class="font-mono px-1 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/40">{{ currentPage() }}</strong> page. 
              The current theme is <strong class="capitalize">{{ isDarkTheme() ? 'Dark' : 'Light' }}</strong> and the language selected is <strong class="uppercase">{{ currentLanguage() }}</strong>.
              <br><br>
              The navigation component is fully responsive, try resizing your browser window or viewing it on a mobile device to see the hamburger menu in action!
            </p>
          </div>
        </main>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // --- State Management (Signals) ---
  
  // Theme state: true for Dark, false for Light
  isDarkTheme = signal(
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Language state: 'es' for Spanish, 'en' for English, etc.
  currentLanguage = signal('en');

  // Menu states for mobile and desktop dropdowns
  isMenuOpen = signal(false);
  isAccountDropdownOpen = signal(false);
  isMobileAccountDropdownOpen = signal(false);

  // Current active page ID
  currentPage = signal('home');

  // --- Configuration ---
  
  navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: 'home', path: '/' },
    { 
      id: 'account', 
      label: 'Account', 
      icon: 'user', 
      path: '/account',
      subItems: [
        { id: 'profile', label: 'Profile Settings', icon: 'settings', path: '/account/profile' },
        { id: 'notifications', label: 'Notifications', icon: 'bell', path: '/account/notifications' },
        { id: 'billing', label: 'Billing & History', icon: 'credit-card', path: '/account/billing' },
      ]
    },
    { id: 'tradingpost', label: 'Tradingpost', icon: 'store', path: '/tradingpost' },
    { id: 'characters', label: 'Characters', icon: 'users', path: '/characters' },
    { id: 'analytics', label: 'Analytics', icon: 'bar-chart', path: '/analytics' },
  ];

  // --- Effects ---
  
  constructor() {
    // Effect to apply/remove the 'dark' class to the document root element
    // This is crucial for Tailwind to recognize the theme change globally
    effect(() => {
      if (typeof document !== 'undefined') {
        if (this.isDarkTheme()) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    });
  }

  // --- Methods ---

  // Toggles between light and dark theme
  toggleTheme(): void {
    this.isDarkTheme.update(current => !current);
  }

  // Sets the selected language
  setLanguage(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.currentLanguage.set(selectElement.value);
  }

  // Toggles the mobile hamburger menu
  toggleMobileMenu(): void {
    this.isMenuOpen.update(current => !current);
    // Ensure mobile account dropdown is closed when closing main menu
    if (!this.isMenuOpen()) {
        this.isMobileAccountDropdownOpen.set(false);
    }
  }
  
  // Toggles the desktop 'Account' dropdown
  toggleAccountDropdown(): void {
    this.isAccountDropdownOpen.update(current => !current);
  }

  // Closes the desktop 'Account' dropdown (used on blur)
  closeAccountDropdown(): void {
    // Delay necessary to allow click event to register before blur closes it
    setTimeout(() => this.isAccountDropdownOpen.set(false), 150);
  }

  // Toggles the mobile 'Account' dropdown
  toggleMobileAccountDropdown(): void {
    this.isMobileAccountDropdownOpen.update(current => !current);
  }

  // Sets the active page
  selectPage(pageId: string): void {
    this.currentPage.set(pageId);
    this.isAccountDropdownOpen.set(false); // Close desktop dropdown after selection
  }

  // Helper to check if a page is the current page
  isCurrentPage(pageId: string): boolean {
    return this.currentPage() === pageId;
  }
  
  // Helper to check if any Account sub-page is active,
  // used to highlight the main 'Account' link/dropdown
  isAccountActive(): boolean {
    const accountItem = this.navItems.find(item => item.id === 'account');
    if (!accountItem || !accountItem.subItems) return false;
    
    return accountItem.subItems.some(subItem => this.isCurrentPage(subItem.id)) || this.isCurrentPage('account');
  }

  // Gets the full label of the current page for the content area
  getCurrentPageLabel(): string {
    // Search main items
    const mainItem = this.navItems.find(item => item.id === this.currentPage());
    if (mainItem) return mainItem.label;

    // Search sub-items
    for (const item of this.navItems) {
      if (item.subItems) {
        const subItem = item.subItems.find(sub => sub.id === this.currentPage());
        if (subItem) return `${item.label}: ${subItem.label}`;
      }
    }
    return 'Content Page';
  }
}

 */