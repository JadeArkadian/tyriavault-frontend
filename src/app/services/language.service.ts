import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translocoService = inject(TranslocoService);
  private readonly storageService = inject(StorageService);

  constructor() {
    const storedLang = this.storageService.language();
    if (storedLang) {
      this.translocoService.setActiveLang(storedLang);
    } else {
      const browserLang = navigator.language.split('-')[0];
      const availableLangs = this.translocoService.getAvailableLangs() as string[];
      const langToSet = availableLangs.includes(browserLang) ? browserLang : this.translocoService.getDefaultLang();
      this.translocoService.setActiveLang(langToSet);
      this.storageService.setLanguage(langToSet);
    }
  }

  public setLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.storageService.setLanguage(lang);
  }
}
