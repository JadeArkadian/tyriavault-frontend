import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MobileLanguageSelectorComponent } from './mobile-language-selector.component';


describe('LanguageSelectorComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileLanguageSelectorComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('should create the language selection component', () => {
    const fixture = TestBed.createComponent(MobileLanguageSelectorComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
