import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DesktopLanguageSelectorComponent } from './desktop-language-selector.component';


describe('DesktopLanguageSelectorComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopLanguageSelectorComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('should create the language selection component', () => {
    const fixture = TestBed.createComponent(DesktopLanguageSelectorComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
