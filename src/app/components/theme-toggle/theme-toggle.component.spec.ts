import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle.component';


describe('LanguageSelectorComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('should create the language selection component', () => {
    const fixture = TestBed.createComponent(ThemeToggleComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
