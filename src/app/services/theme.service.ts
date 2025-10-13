import { Injectable, signal, effect } from '@angular/core';

/**
 * Service in charge of switching between Dark theme and Light theme
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {

  public isDarkTheme = signal(
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  constructor() {
    // Apply 'dark' to the document
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

  /**
   * Switches from a theme to another
   */
  public toggleTheme(): void {
    this.isDarkTheme.update(current => !current);
  }
}
