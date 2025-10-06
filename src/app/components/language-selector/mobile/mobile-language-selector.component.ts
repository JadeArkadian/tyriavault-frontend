import {Component, inject, signal} from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-mobile-language-selector',
  standalone: true,
  templateUrl: './mobile-language-selector.component.html',
  styleUrls: ['./mobile-language-selector.component.css']
})
export class MobileLanguageSelectorComponent {

  private readonly translocoService = inject(TranslocoService);

  // Language state: 'es' for Spanish, 'en' for English, etc.
  public currentLanguage = signal('en');

  // Sets the selected language
  public changeLang(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const langCode = selectElement.value;

    console.debug(langCode);

    if (langCode != null) {
      this.currentLanguage.set(langCode);
      this.translocoService.setActiveLang(langCode);
    }
  }
}
