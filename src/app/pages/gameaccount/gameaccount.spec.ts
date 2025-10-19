import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GameaccountComponent } from './gameaccount.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';


describe('GameaccountComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameaccountComponent],
      providers: [
        provideZonelessChangeDetection(),    
        provideHttpClient(), 
        provideHttpClientTesting() ]
    }).compileComponents();
  });

  it('should create the gameaccount page', () => {
    const fixture = TestBed.createComponent(GameaccountComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
