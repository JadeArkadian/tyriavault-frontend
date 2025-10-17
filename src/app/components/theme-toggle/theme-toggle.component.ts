import { Component, inject } from '@angular/core';
import {ThemeService} from '../../services/theme.service';

/**
 * A theme toggler to switch between dark theme and light theme
 */
@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent {
  public readonly themeService = inject(ThemeService);

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }

}
