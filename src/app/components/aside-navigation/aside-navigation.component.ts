import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavItem } from '../../interfaces/nav-item';
import { TranslocoPipe } from '@jsverse/transloco';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside-navigation',
  imports: [TranslocoPipe],
  standalone: true,
  templateUrl: './aside-navigation.component.html',
  styleUrl: './aside-navigation.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AsideNavigationComponent { 

  private readonly router = inject(Router);

  // Current active page ID
  public currentPage = signal('summary');

  // --- Navigation Data ---
  public navItems: NavItem[] = [
    { id: 'summary', label: 'account.navbar.summary', path: '/account' },
    { id: 'achievements', label: 'account.navbar.achievements', path: '/account/achievements' },
    { id: 'dyes', label: 'account.navbar.dyes', path: '/account/dyes' },
    { id: 'emotes', label: 'account.navbar.emotes', path: '/account/emotes' },
    { id: 'minis', label: 'account.navbar.minis', path: '/account/minis' },
    { id: 'bank', label: 'account.navbar.bank', path: '/account/bank' },
    { id: 'materials', label: 'account.navbar.materials', path: '/account/materials' }
  ];


  // --- Methods ---

  /**
   * Method called to force the navigation
   * @param path Path to be called
   */
  public navigate(path: string): void {
    if (path != null) {
      this.router.navigateByUrl(path);
    }
  }

  /**
   * Helper to check if a page is the current page
   * @param pageId 
   * @returns 
   */
  public isCurrentPage(pageId: string): boolean {
    return this.currentPage() === pageId;
  }

  /**
   * Sets the active page both for Dekstop and Mobile menu
   * @param pageId 
   * @param pathUrl
   */
  public selectPage(pageId: string, pathUrl:string): void {
    this.currentPage.set(pageId);
    this.navigate(pathUrl);
  }

}
