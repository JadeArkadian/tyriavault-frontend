import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private apiURL = 'http://localhost:3000/api/products';

  private readonly httpClient = inject(HttpClient);

  getProducts(): Observable<any> {
    return this.httpClient.get(this.apiURL);
  }

}
