import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { dateConversionInterceptor } from './date-conversion.interceptor';
import { of } from 'rxjs';

describe('dateConversionInterceptor', () => {
  const interceptor: HttpInterceptorFn = dateConversionInterceptor;

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should convert ISO date strings to Date objects in the response body', (done) => {
    const body = {
      name: 'Test',
      created: '2023-10-26T10:00:00Z',
      nested: {
        updated: '2023-10-27T12:30:00.123Z'
      }
    };

    const req = new HttpRequest('GET', '/api/test');
    const next = () => {
      return of(new HttpResponse({ body: body }));
    };

    interceptor(req, next).subscribe(event => {
      if (event instanceof HttpResponse) {
        expect(event.body.created).toBeInstanceOf(Date);
        expect(event.body.created.toISOString()).toBe('2023-10-26T10:00:00.000Z');
        expect(event.body.nested.updated).toBeInstanceOf(Date);
        expect(event.body.nested.updated.toISOString()).toBe('2023-10-27T12:30:00.123Z');
        done();
      }
    });
  });

  it('should not convert non-date strings', (done) => {
    const body = {
      name: 'Test',
      description: 'This is not a date: 2023-10-26',
    };

    const req = new HttpRequest('GET', '/api/test');
    const next = () => {
      return of(new HttpResponse({ body: body }));
    };

    interceptor(req, next).subscribe(event => {
      if (event instanceof HttpResponse) {
        expect(typeof event.body.description).toBe('string');
        done();
      }
    });
  });

  it('should handle response with no body', (done) => {
    const req = new HttpRequest('GET', '/api/test');
    const next = () => {
      return of(new HttpResponse({ status: 204 }));
    };

    interceptor(req, next).subscribe(event => {
      if (event instanceof HttpResponse) {
        expect(event.body).toBeNull();
        done();
      }
    });
  });

  it('should handle arrays in the response body', (done) => {
    const body = [
      { date: '2023-01-01T00:00:00Z' },
      { date: '2023-01-02T00:00:00Z' }
    ];

    const req = new HttpRequest('GET', '/api/test');
    const next = () => {
      return of(new HttpResponse({ body: body }));
    };

    interceptor(req, next).subscribe(event => {
      if (event instanceof HttpResponse) {
        expect(event.body[0].date).toBeInstanceOf(Date);
        expect(event.body[1].date).toBeInstanceOf(Date);
        done();
      }
    });
  });
});