import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TradingpostComponent } from './tradingpost.component';

describe('TradingpostComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradingpostComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('should create the tradingpost page', () => {
    const fixture = TestBed.createComponent(TradingpostComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
