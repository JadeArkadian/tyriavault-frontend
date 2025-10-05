import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';

@Component({
  selector: 'app-header',
  imports: [LanguageSelectorComponent, TranslocoDirective],
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
