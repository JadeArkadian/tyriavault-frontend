import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  isDarkTheme = signal(
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  constructor() {
    // Aplicar clase 'dark' automáticamente al document
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

  toggleTheme(): void {
    this.isDarkTheme.update(current => !current);
  }

  setTheme(dark: boolean): void {
    this.isDarkTheme.set(dark);
  }
}
