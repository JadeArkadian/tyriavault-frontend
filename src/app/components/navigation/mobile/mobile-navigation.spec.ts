import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MobileNavigationComponent } from './mobile-navigation.component';


describe('MobileNavigationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNavigationComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('should create the mobile navigation component', () => {
    const fixture = TestBed.createComponent(MobileNavigationComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
