import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';
import { LanguageService } from '../../../services/language.service';

/**
 * A component to select the desired language. Desktop version
 * It relies completely on Transloco module @see TranslocoService
 */
@Component({
  selector: 'app-desktop-language-selector',
  standalone: true,
  templateUrl: './desktop-language-selector.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DesktopLanguageSelectorComponent {

  private readonly translocoService = inject(TranslocoService);
  private readonly languageService = inject(LanguageService);

  // Language state: 'es' for Spanish, 'en' for English, etc.
  public currentLanguage = toSignal(this.translocoService.langChanges$, { initialValue: this.translocoService.getActiveLang() });

  /**
   * Sets the selected language
   * @param event
   */
  public changeLang(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const langCode = selectElement.value;

    console.debug(langCode);

    if (langCode != null) {
      this.languageService.setLanguage(langCode);
    }
  }
}
