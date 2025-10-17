import {Component, inject} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@jsverse/transloco';
import {ThemeService} from './services/theme.service';
import { AsyncPipe } from '@angular/common';
import { LoadingService } from './services/loading.service';
import { LanguageService } from './services/language.service';

/**
 * The App component. Serves as entrypoint component of the whole application
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AsyncPipe],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private readonly router = inject(Router)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly titleService = inject(Title)
  private readonly translocoService = inject(TranslocoService)
  public readonly themeService = inject(ThemeService)
  public readonly loadingService = inject(LoadingService);
  private readonly languageService = inject(LanguageService);

  constructor() {
    // Changes the browser title by listening to the Navigation events from the router
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap(route => route.data)
      )
      .subscribe(data => {
        if (data['titleKey']) {
          this.translocoService.selectTranslate(data['titleKey']).subscribe(title => {
            this.titleService.setTitle(title);
          });
        }
      });
  }
}
