import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { TranslocoTestingModule } from '@jsverse/transloco';


describe('FooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FooterComponent,
        TranslocoTestingModule.forRoot({
          preloadLangs: true
        })
      ],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  

  it('should create the footer component', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
