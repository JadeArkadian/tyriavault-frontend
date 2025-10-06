import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LanguageSelectorComponent } from './language-selector.component';


describe('LanguageSelectorComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSelectorComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('should create the language selection component', () => {
    const fixture = TestBed.createComponent(LanguageSelectorComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
