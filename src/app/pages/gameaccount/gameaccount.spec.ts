import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GameaccountComponent } from './gameaccount.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';

describe('GameaccountComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GameaccountComponent,
        TranslocoTestingModule.forRoot({
          langs: {
            en: {},
            es: {},
            de: {},
            fr: {}
          },
          translocoConfig: {
            availableLangs: ['en', 'es', 'de', 'fr'],
            defaultLang: 'en',
          },
        }),
      ],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  it('should create the gameaccount page', () => {
    const fixture = TestBed.createComponent(GameaccountComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
