import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { StorageService } from './storage.service';

/**
 * Language service. It's meant to have both the language stored with the @see StorageService 
 * and the language given by the @see TranslocoService with the same value. 
 * You may continue to use theses services to query the current language but please, avoid 
 * changing the language individually by using the setter methods of thoses services.
 * Use this service instead
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translocoService = inject(TranslocoService);
  private readonly storageService = inject(StorageService);

  constructor() {
    const storedLang = this.storageService.language();
    if (storedLang) {
      this.translocoService.setActiveLang(storedLang);
    } else {
      // No value stored? Well, lets initialize it by grabbing the browser prefered language
      const browserLang = navigator.language.split('-')[0];
      const availableLangs = this.translocoService.getAvailableLangs() as string[];
      const langToSet = availableLangs.includes(browserLang) ? browserLang : this.translocoService.getDefaultLang();
      this.translocoService.setActiveLang(langToSet);
      this.storageService.setLanguage(langToSet);
    }
  }

  /**
   * 
   * @param lang The new language (es,en,fr,de)
   */
  public setLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.storageService.setLanguage(lang);
  }
}
