
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ThemeService } from './theme.service';
import { StorageService } from './storage.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let storageService: StorageService;
  let themeSignal: jest.Mock;

  const mockStorageService = {
    theme: jest.fn(),
    setTheme: jest.fn(),
  };

  const setup = (storedTheme?: string, prefersDark?: boolean) => {
    mockStorageService.theme.mockReturnValue(storedTheme);

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)' ? prefersDark : false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: StorageService, useValue: mockStorageService },
      ],
    });

    service = TestBed.inject(ThemeService);
    storageService = TestBed.inject(StorageService);
    TestBed.flushEffects();
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    // Spy on documentElement classList
    jest.spyOn(document.documentElement.classList, 'add').mockClear();
    jest.spyOn(document.documentElement.classList, 'remove').mockClear();
  });

  it('should be created', () => {
    setup();
    expect(service).toBeTruthy();
  });

  it('should initialize with dark theme if storage has "dark"', () => {
    setup('dark');
    expect(service.isDarkTheme()).toBe(true);
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
  });

  it('should initialize with light theme if storage has "light"', () => {
    setup('light');
    expect(service.isDarkTheme()).toBe(false);
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith('dark');
  });

  it('should initialize with dark theme if no storage and OS prefers dark', () => {
    setup(undefined, true);
    expect(service.isDarkTheme()).toBe(true);
    expect(storageService.setTheme).toHaveBeenCalledWith('dark');
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
  });

  it('should initialize with light theme if no storage and OS prefers light', () => {
    setup(undefined, false);
    expect(service.isDarkTheme()).toBe(false);
    expect(storageService.setTheme).toHaveBeenCalledWith('light');
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith('dark');
  });

  it('#toggleTheme should switch from light to dark', () => {
    setup('light');
    expect(service.isDarkTheme()).toBe(false);

    service.toggleTheme();
    TestBed.flushEffects();

    expect(service.isDarkTheme()).toBe(true);
    expect(storageService.setTheme).toHaveBeenCalledWith('dark');
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
  });

  it('#toggleTheme should switch from dark to light', () => {
    setup('dark');
    expect(service.isDarkTheme()).toBe(true);

    service.toggleTheme();
    TestBed.flushEffects();

    expect(service.isDarkTheme()).toBe(false);
    expect(storageService.setTheme).toHaveBeenCalledWith('light');
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith('dark');
  });
});
