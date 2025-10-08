import {Component, inject} from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop'; 

@Component({
  selector: 'app-desktop-language-selector',
  standalone: true,
  templateUrl: './desktop-language-selector.component.html',
  styleUrls: ['./desktop-language-selector.component.css']
})
export class DesktopLanguageSelectorComponent {

  private readonly translocoService = inject(TranslocoService);

  // Language state: 'es' for Spanish, 'en' for English, etc.
  public currentLanguage = toSignal(this.translocoService.langChanges$, { initialValue: this.translocoService.getActiveLang() });

  // Sets the selected language
  public changeLang(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const langCode = selectElement.value;

    console.debug(langCode);

    if (langCode != null) {
      this.translocoService.setActiveLang(langCode);
    }
  }
}
