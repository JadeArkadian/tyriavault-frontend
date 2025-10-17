import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GameaccountComponent } from './gameaccount.component';


describe('GameaccountComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameaccountComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('should create the gameaccount page', () => {
    const fixture = TestBed.createComponent(GameaccountComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
