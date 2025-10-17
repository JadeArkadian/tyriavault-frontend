import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // Private writable signal to hold the API key
  private readonly _apiKey = signal<string | undefined>(
    this.getApiKeyFromStorage()
  );

  // Private writable signal to hold the theme
  private readonly _theme = signal<string | undefined>(this.getThemeFromStorage());

  // Public readonly signal to expose the API key safely
  public readonly apiKey = this._apiKey.asReadonly();

  // Public readonly signal to expose the theme safely
  public readonly theme = this._theme.asReadonly();

  /**
   * Sets the API key in the storage service.
   * @param apiKey The API key to store.
   */
  setApiKey(apiKey: string): void {
    this._apiKey.set(apiKey);
    localStorage.setItem('apiKey', apiKey);
  }

  /**
   * Clears the stored API key.
   */
  clearApiKey(): void {
    this._apiKey.set(undefined);
    localStorage.removeItem('apiKey');
  }

  /**
   * Sets the theme in the storage service.
   * @param theme The theme to store.
   */
  setTheme(theme: string): void {
    this._theme.set(theme);
    localStorage.setItem('theme', theme);
  }

  /**
   * Clears the stored theme.
   */
  clearTheme(): void {
    this._theme.set(undefined);
    localStorage.removeItem('theme');
  }

  /**
   * Retrieves the API key from localStorage.
   * @returns The stored API key or undefined if not found.
   */
  private getApiKeyFromStorage(): string | undefined {
    const apiKey = localStorage.getItem('apiKey');
    return apiKey ? apiKey : undefined;
  }

  /**
   * Retrieves the theme from localStorage.
   * @returns The stored theme or undefined if not found.
   */
  private getThemeFromStorage(): string | undefined {
    const theme = localStorage.getItem('theme');
    return theme ? theme : undefined;
  }
}
