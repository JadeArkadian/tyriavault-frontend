import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MobileLanguageSelectorComponent } from './mobile-language-selector.component';
import { TranslocoTestingModule } from '@jsverse/transloco';


describe('MobileLanguageSelectorComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileLanguageSelectorComponent,TranslocoTestingModule.forRoot({preloadLangs: true})],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('should create the mobile language selection component', () => {
    const fixture = TestBed.createComponent(MobileLanguageSelectorComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
