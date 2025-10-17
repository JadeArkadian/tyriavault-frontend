import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let store: { [key: string]: string } = {};

  beforeEach(() => {
    store = {};
    const mockLocalStorage = {
      getItem: (key: string): string | null => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };

    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage, writable: true });

    TestBed.configureTestingModule({
      providers: [StorageService],
    });
  });

  describe('when initialized without data in localStorage', () => {
    beforeEach(() => {
      service = TestBed.inject(StorageService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('ApiKey', () => {
      it('should set and get api key', () => {
        const apiKey = 'test-key';
        service.setApiKey(apiKey);
        expect(service.apiKey()).toBe(apiKey);
        expect(localStorage.getItem('apiKey')).toBe(apiKey);
      });

      it('should clear api key', () => {
        const apiKey = 'test-key';
        service.setApiKey(apiKey);
        service.clearApiKey();
        expect(service.apiKey()).toBeUndefined();
        expect(localStorage.getItem('apiKey')).toBeNull();
      });
    });

    describe('Theme', () => {
      it('should set and get theme', () => {
        const theme = 'dark';
        service.setTheme(theme);
        expect(service.theme()).toBe(theme);
        expect(localStorage.getItem('theme')).toBe(theme);
      });

      it('should clear theme', () => {
        const theme = 'dark';
        service.setTheme(theme);
        service.clearTheme();
        expect(service.theme()).toBeUndefined();
        expect(localStorage.getItem('theme')).toBeNull();
      });
    });

    describe('Language', () => {
      it('should set and get language', () => {
        const lang = 'es';
        service.setLanguage(lang);
        expect(service.language()).toBe(lang);
        expect(localStorage.getItem('language')).toBe(lang);
      });

      it('should clear language', () => {
        const lang = 'es';
        service.setLanguage(lang);
        service.clearLanguage();
        expect(service.language()).toBeUndefined();
        expect(localStorage.getItem('language')).toBeNull();
      });
    });
  });

  describe('when initialized with data in localStorage', () => {
    it('should initialize apiKey from localStorage', () => {
      localStorage.setItem('apiKey', 'initial-key');
      service = TestBed.inject(StorageService);
      expect(service.apiKey()).toBe('initial-key');
    });

    it('should initialize theme from localStorage', () => {
      localStorage.setItem('theme', 'initial-theme');
      service = TestBed.inject(StorageService);
      expect(service.theme()).toBe('initial-theme');
    });

    it('should initialize language from localStorage', () => {
      localStorage.setItem('language', 'initial-lang');
      service = TestBed.inject(StorageService);
      expect(service.language()).toBe('initial-lang');
    });
  });
});