import { Component, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent {
  
  private transloco = inject(TranslocoService);

  changeLang(event:any) {
    const target = event.target as HTMLSelectElement;
    const langCode = target.value;

    console.debug(langCode);
    
    if (langCode != null) {
      this.transloco.setActiveLang(langCode);   
    }
  }
}
