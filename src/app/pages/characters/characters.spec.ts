import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CharactersComponent } from './characters.component';


describe('CharactersComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('should create the characters page', () => {
    const fixture = TestBed.createComponent(CharactersComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
