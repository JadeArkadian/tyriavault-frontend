import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

/**
 * Represents the footer section of the application.
 * This component displays copyright information, links, and other footer content.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslocoDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent { }
