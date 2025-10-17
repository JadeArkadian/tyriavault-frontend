
import { TestBed } from '@angular/core/testing';
import { TranslocoService, TranslocoTestingModule } from '@jsverse/transloco';
import { LanguageService } from './language.service';
import { StorageService } from './storage.service';

describe('LanguageService', () => {
  let service: LanguageService;
  let storageService: StorageService;
  let translocoService: TranslocoService;

  const storageServiceMock = {
    language: jest.fn(),
    setLanguage: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {}, fr: {}, de: {} },
          translocoConfig: {
            availableLangs: ['en', 'es', 'fr', 'de'],
            defaultLang: 'en',
          },
        }),
      ],
      providers: [
        LanguageService,
        { provide: StorageService, useValue: storageServiceMock },
      ],
    });

    storageService = TestBed.inject(StorageService);
    translocoService = TestBed.inject(TranslocoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    service = TestBed.inject(LanguageService);
    expect(service).toBeTruthy();
  });

  it('should set active lang from storage if available', () => {
    (storageService.language as jest.Mock).mockReturnValue('fr');
    jest.spyOn(translocoService, 'setActiveLang');

    service = TestBed.inject(LanguageService);

    expect(storageService.language).toHaveBeenCalled();
    expect(translocoService.setActiveLang).toHaveBeenCalledWith('fr');
  });

  it('should set active lang from browser language if available and storage is empty', () => {
    (storageService.language as jest.Mock).mockReturnValue(null);
    Object.defineProperty(navigator, 'language', {
      value: 'de-DE',
      configurable: true,
    });
    jest.spyOn(translocoService, 'setActiveLang');
    jest.spyOn(storageService, 'setLanguage');

    service = TestBed.inject(LanguageService);

    expect(translocoService.setActiveLang).toHaveBeenCalledWith('de');
    expect(storageService.setLanguage).toHaveBeenCalledWith('de');
  });

  it('should set default lang if browser language is not available and storage is empty', () => {
    (storageService.language as jest.Mock).mockReturnValue(null);
    Object.defineProperty(navigator, 'language', {
      value: 'it-IT',
      configurable: true,
    });
    jest.spyOn(translocoService, 'setActiveLang');
    jest.spyOn(storageService, 'setLanguage');

    service = TestBed.inject(LanguageService);

    expect(translocoService.setActiveLang).toHaveBeenCalledWith('en');
    expect(storageService.setLanguage).toHaveBeenCalledWith('en');
  });

  describe('setLanguage', () => {
    it('should set the language in transloco and storage', () => {
      service = TestBed.inject(LanguageService);
      jest.spyOn(translocoService, 'setActiveLang');
      jest.spyOn(storageService, 'setLanguage');

      service.setLanguage('es');

      expect(translocoService.setActiveLang).toHaveBeenCalledWith('es');
      expect(storageService.setLanguage).toHaveBeenCalledWith('es');
    });
  });
});
