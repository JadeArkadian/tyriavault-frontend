import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Expresión regular para detectar fechas en formato ISO 8601
const iso8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+\-]\d{2}:\d{2}))$/;

/**
 * ISO8601 Date conversion interceptor. Scans the whole body to do the conversion
 * @param req 
 * @param next 
 * @returns 
 */
export const dateConversionInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  return next(req).pipe(
    map(event => {
      if (event instanceof HttpResponse && event.body) {
        convertDates(event.body);
      }
      return event;
    })
  );
};


/**
 * Function that looks inside the whole object for ISO 8601 strings and cast them into Dates
 * @param body 
 * @returns 
 */
function convertDates(body: any) {
  if (body === null || body === undefined || typeof body !== 'object') {
    return;
  }

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (typeof value === 'string' && iso8601.test(value)) {
      body[key] = new Date(value);
    } else if (typeof value === 'object') {
      // Recursive call for nested objects
      convertDates(value);
    }
  }
}