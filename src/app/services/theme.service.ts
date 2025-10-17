import { Injectable, signal, effect, inject } from '@angular/core';
import { StorageService } from './storage.service';

/**
 * Service in charge of switching between Dark theme and Light theme
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageService = inject(StorageService);

  public isDarkTheme = signal(this.storageService.theme() === 'dark');

  constructor() {
    // Set initial theme based on storage or preference
    const storedTheme = this.storageService.theme();
    if (storedTheme) {
      this.isDarkTheme.set(storedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkTheme.set(prefersDark);
      this.storageService.setTheme(prefersDark ? 'dark' : 'light');
    }

    // Apply 'dark' to the document
    effect(() => {
      if (typeof document !== 'undefined') {
        const isDark = this.isDarkTheme();
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        this.storageService.setTheme(isDark ? 'dark' : 'light');
      }
    });
  }

  /**
   * Switches from a theme to another
   */
  public toggleTheme(): void {
    this.isDarkTheme.update(current => !current);
  }
}
