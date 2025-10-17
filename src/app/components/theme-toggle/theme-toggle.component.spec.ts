import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle.component';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('ThemeToggleComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('should create the theme toggler component', () => {
    const fixture = TestBed.createComponent(ThemeToggleComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
