import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [LanguageSelectorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HeaderComponent {

  private router = inject(Router);

  public navigate(path: string): void {
    this.router.navigateByUrl(path);
  }

}
