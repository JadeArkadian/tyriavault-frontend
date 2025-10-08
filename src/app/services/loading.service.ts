import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoadingService {
  private requestCount = 0;
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loadingSubject.asObservable();

  public setLoading(isLoading: boolean) {
    this.requestCount = isLoading ? this.requestCount + 1 : this.requestCount - 1;
    if (this.requestCount < 0) {
        this.requestCount = 0;
    }
    this.loadingSubject.next(this.requestCount > 0);
  }
}
