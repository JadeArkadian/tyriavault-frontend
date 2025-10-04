import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AnalyticsComponent } from './analytics.component';


describe('AnalyticsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('should create the analytics page', () => {
    const fixture = TestBed.createComponent(AnalyticsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
