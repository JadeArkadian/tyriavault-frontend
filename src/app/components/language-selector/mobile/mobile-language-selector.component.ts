import {Component, inject} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-mobile-language-selector',
  standalone: true,
  templateUrl: './mobile-language-selector.component.html'
})
export class MobileLanguageSelectorComponent {

  private readonly translocoService = inject(TranslocoService);
  private readonly languageService = inject(LanguageService);

  // Language state: 'es' for Spanish, 'en' for English, etc.
  public currentLanguage = toSignal(this.translocoService.langChanges$, { initialValue: this.translocoService.getActiveLang() });

  // Sets the selected language
  public changeLang(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const langCode = selectElement.value;

    console.debug(langCode);

    if (langCode != null) {
      this.languageService.setLanguage(langCode);
    }
  }
}
