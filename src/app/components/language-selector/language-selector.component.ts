import { Component } from '@angular/core';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent {
  currentLang = 'es';

  setLanguage(lang: string) {
    this.currentLang = lang;
    console.log(`Idioma cambiado a: ${lang}`);
  }
}
