import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TranslocoTestingModule } from '@jsverse/transloco';

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

describe('HeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent,        
          TranslocoTestingModule.forRoot({preloadLangs: true})],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('should create the header navbar component', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
