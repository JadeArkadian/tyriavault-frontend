import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DesktopNavigationComponent } from './desktop-navigation.component';


describe('DesktopNavigationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopNavigationComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('should create the navigation component', () => {
    const fixture = TestBed.createComponent(DesktopNavigationComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
