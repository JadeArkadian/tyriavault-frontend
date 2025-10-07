import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const loadingService = inject(LoadingService);

    // Avoid using loader for languages
    if (req.url.includes('/language/')) {
        return next(req);
    }

    loadingService.setLoading(true);
    return next(req).pipe(
        finalize(() => loadingService.setLoading(false))
    );
};