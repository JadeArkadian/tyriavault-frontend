import { TranslocoService, TranslocoTestingModule } from '@jsverse/transloco';
import { LocalizedTextPipe } from './localized-text.pipe';
import { TestBed } from '@angular/core/testing';
import { LocalizedText } from '../interfaces/api-responses';

describe('LocalizedTextPipe', () => {
  let pipe: LocalizedTextPipe;
  let translocoService: TranslocoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
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
      providers: [LocalizedTextPipe],
    });

    pipe = TestBed.inject(LocalizedTextPipe);
    translocoService = TestBed.inject(TranslocoService);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an empty string for null or undefined input', () => {
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should return the text in the active language', () => {
    const localizedText: LocalizedText = {
      en: 'Hello',
      es: 'Hola',
      de: 'Hallo',
      fr: 'Bonjour',
    };

    translocoService.setActiveLang('es');
    expect(pipe.transform(localizedText)).toBe('Hola');

    translocoService.setActiveLang('en');
    expect(pipe.transform(localizedText)).toBe('Hello');
  });

  it('should return the english text if the active language is not available', () => {
    const localizedText: LocalizedText = {
      en: 'Hello',
      es: 'Hola',
    };

    translocoService.setActiveLang('fr');
    expect(pipe.transform(localizedText)).toBe('Hello');
  });

  it('should return the first available language if active and english are not present', () => {
    const localizedText: LocalizedText = {
      fr: 'Bonjour',
      de: 'Hallo',
    };

    translocoService.setActiveLang('es');
    expect(pipe.transform(localizedText)).toBe('Bonjour');
  });

  it('should return an empty string if no languages are available', () => {
    const localizedText: LocalizedText = {};
    translocoService.setActiveLang('en');
    expect(pipe.transform(localizedText)).toBe('');
  });
});
