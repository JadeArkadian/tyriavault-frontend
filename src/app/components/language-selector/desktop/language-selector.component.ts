import {Component, inject, signal} from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent {

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
